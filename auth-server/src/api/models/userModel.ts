import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {promisePool} from '../../lib/db';
import {UserWithLevel, User, UserWithNoPassword} from '../../types/DBTypes';
import {UserDeleteResponse} from '../../types/MessageTypes';

const getUserById = async (id: number): Promise<UserWithNoPassword | null> => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT
        Users.userId,
        Users.username,
        Users.email,
        Users.createdAt,
        UserLevels.levelName
      FROM Users
      JOIN UserLevels ON Users.userLevelId = UserLevels.LevelId
      WHERE Users.userId = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }
    
    const result = rows as RowDataPacket[] & UserWithNoPassword[];
    return result[0];
  } catch (e) {
    console.error('getUserById error', e instanceof Error ? e.message : '');
    throw e;
  }
};

const getAllUsers = async (): Promise<UserWithNoPassword[] | null> => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT
        Users.userId,
        Users.username,
        Users.email,
        Users.createdAt,
        UserLevels.levelName
      FROM Users
      JOIN UserLevels ON Users.userLevelId = UserLevels.LevelId
      `
    );
    const users: RowDataPacket[] & UserWithNoPassword[] = rows as RowDataPacket[] & UserWithNoPassword[];

    if (users.length === 0) {
      return null;
    }

    return users;
  } catch (e) {
    console.error('getAllUsers error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const getUserByEmail = async (email: string): Promise<UserWithLevel | null> => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT
        Users.userId,
        Users.username,
        Users.password,
        Users.email,
        Users.createdAt,
        UserLevels.levelName
      FROM Users
      JOIN UserLevels ON Users.userLevelId = UserLevels.LevelId
      WHERE Users.email = ?
      `,
      [email]
    );

    const users: RowDataPacket[] & UserWithLevel[] = rows as RowDataPacket[] & UserWithLevel[];

    if (users.length === 0) {
      return null;
    }

    return users[0];
  } catch (e) {
    console.error('getUserByEmail error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const getUserByUsername = async (username: string): Promise<UserWithLevel | null> => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT
        Users.userId,
        Users.username,
        Users.password,
        Users.email,
        Users.createdAt,
        UserLevels.levelName
      FROM Users
      JOIN UserLevels ON Users.userLevelId = UserLevels.LevelId
      WHERE Users.username = ?
      `,
      [username]
    );

    const users: RowDataPacket[] & UserWithLevel[] = rows as RowDataPacket[] & UserWithLevel[];

    if (users.length === 0) {
      return null;
    }

    return users[0];
  } catch (e) {
    console.error('getUserByUsername error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const createUser = async (user: User): Promise<UserWithNoPassword | null> => {
  try {
    const [result] = await promisePool.execute(
      `
      INSERT INTO Users (username, password, email, userLevelId)
      VALUES (?, ?, ?, ?)
      `,
      [user.username, user.password, user.email, user.userLevelId] // Assuming userLevelId is part of User type
    );

    const header: ResultSetHeader = result as ResultSetHeader;

    if (header.affectedRows === 0) {
      return null;
    }

    const newUser = await getUserById(header.insertId);
    return newUser;
  } catch (e) {
    console.error('createUser error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const modifyUser = async (user: User, id: number): Promise<UserWithNoPassword | null> => {
  try {
    const [result] = await promisePool.execute(
      `
      UPDATE Users
      SET username = ?, password = ?, email = ?, userLevelId = ?
      WHERE userId = ?
      `,
      [user.username, user.password, user.email, user.userLevelId, id] // Adjust according to User type
    );

    const header: ResultSetHeader = result as ResultSetHeader;

    if (header.affectedRows === 0) {
      return null;
    }

    const updatedUser = await getUserById(id);
    return updatedUser;
  } catch (e) {
    console.error('modifyUser error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const deleteUser = async (id: number): Promise<UserDeleteResponse | null> => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    // Execute various DELETE operations
    await connection.execute('DELETE FROM Comments WHERE userId = ?;', [id]);
    await connection.execute('DELETE FROM Likes WHERE userId = ?;', [id]);
    await connection.execute('DELETE FROM Ratings WHERE userId = ?;', [id]);
    await connection.execute(
      'DELETE FROM Comments WHERE media_id IN (SELECT media_id FROM MediaItems WHERE userId = ?);',
      [id]
    );
    await connection.execute(
      'DELETE FROM Likes WHERE media_id IN (SELECT media_id FROM MediaItems WHERE userId = ?);',
      [id]
    );
    await connection.execute(
      'DELETE FROM Ratings WHERE media_id IN (SELECT media_id FROM MediaItems WHERE userId = ?);',
      [id]
    );
    await connection.execute(
      'DELETE FROM MediaItemTags WHERE media_id IN (SELECT media_id FROM MediaItems WHERE userId = ?);',
      [id]
    );
    await connection.execute('DELETE FROM MediaItems WHERE userId = ?;', [id]);

    const [result] = await connection.execute(
      'DELETE FROM Users WHERE userId = ?;',
      [id]
    );

    const header: ResultSetHeader = result as ResultSetHeader;

    await connection.commit();

    if (header.affectedRows === 0) {
      return null;
    }

    console.log('result', header);
    return { message: 'User deleted', user: { userId: id } };
  } catch (e) {
    console.error('deleteUser error', e);
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }
};

export {
  getUserById,
  getAllUsers,
  getUserByEmail,
  getUserByUsername,
  createUser,
  modifyUser,
  deleteUser,
};
