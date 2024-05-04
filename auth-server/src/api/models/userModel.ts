import { ResultSetHeader, RowDataPacket } from "mysql2";
import { promisePool } from "../../lib/db";
import { UserWithLevel, User, UserWithNoPassword } from "@sharedTypes/DBTypes";
import { UserDeleteResponse } from "@sharedTypes/MessageTypes";

const getUserById = async (id: number): Promise<UserWithNoPassword | null> => {
  try {
    const [rows] = await promisePool.execute<
      RowDataPacket[] & UserWithNoPassword[]
    >(
      `
      SELECT
        Users.user_id,
        Users.username,
        Users.email,
        Users.created_at,
        Users.user_profile_pic,
        Users.user_level_id
      FROM Users
      JOIN UserLevels ON Users.user_level_id = UserLevels.level_id
      WHERE Users.user_id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (e) {
    console.error("getUserById error", e instanceof Error ? e.message : "");
    throw e;
  }
};


const getAllUsers = async (): Promise<UserWithNoPassword[] | null> => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT
        Users.user_id,
        Users.username,
        Users.email,
        Users.created_at,
        UserLevels.level_name
      FROM Users
      JOIN UserLevels ON Users.user_level_id = UserLevels.level_id
      `
    );
    const users: RowDataPacket[] & UserWithNoPassword[] =
      rows as RowDataPacket[] & UserWithNoPassword[];

    if (users.length === 0) {
      return null;
    }

    return users;
  } catch (e) {
    console.error("getAllUsers error", (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const getUserByEmail = async (email: string): Promise<UserWithLevel | null> => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT
        Users.user_id,
        Users.username,
        Users.password,
        Users.email,
        Users.created_at,
        UserLevels.level_name
      FROM Users
      JOIN UserLevels ON Users.user_level_id = UserLevels.level_id
      WHERE Users.email = ?
      `,
      [email]
    );

    const users: RowDataPacket[] & UserWithLevel[] = rows as RowDataPacket[] &
      UserWithLevel[];

    if (users.length === 0) {
      return null;
    }

    return users[0];
  } catch (e) {
    console.error("getUserByEmail error", (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const getUserByUsername = async (
  username: string
): Promise<UserWithLevel | null> => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT
        Users.user_id,
        Users.username,
        Users.password,
        Users.email,
        Users.created_at,
        Users.user_profile_pic,
        UserLevels.level_name
      FROM Users
      JOIN UserLevels ON Users.user_level_id = UserLevels.level_id
      WHERE Users.username = ?
      `,
      [username]
    );

    const users: RowDataPacket[] & UserWithLevel[] = rows as RowDataPacket[] &
      UserWithLevel[];

    if (users.length === 0) {
      return null;
    }

    return users[0];
  } catch (e) {
    console.error("getUserByUsername error", (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const createUser = async (user: User): Promise<UserWithNoPassword | null> => {
  try {
    const [result] = await promisePool.execute(
      `
      INSERT INTO Users (username, password, email, user_level_id, user_profile_pic, user_banner_pic)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [user.username, user.password, user.email, 2, null, null]
    );

    const header: ResultSetHeader = result as ResultSetHeader;

    if (header.affectedRows === 0) {
      return null;
    }

    const newUser = await getUserById(header.insertId);
    return newUser;
  } catch (e) {
    console.error("createUser error", (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const modifyUser = async (
  user: User,
  id: number
): Promise<UserWithNoPassword | null> => {
  try {
    const [result] = await promisePool.execute(
      `
      UPDATE Users
      SET ?
      WHERE user_id = ?
      `,
      [user, id]
    );

    const header: ResultSetHeader = result as ResultSetHeader;

    if (header.affectedRows === 0) {
      return null;
    }

    const updatedUser = await getUserById(id);
    return updatedUser;
  } catch (e) {
    console.error("modifyUser error", (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const deleteUser = async (id: number): Promise<UserDeleteResponse | null> => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("DELETE FROM FoodDiary WHERE user_id = ?;", [id]);
    await connection.execute("DELETE FROM Exercises WHERE user_id = ?;", [id]);
    await connection.execute("DELETE FROM UserWorkouts WHERE user_id = ?;", [
      id,
    ]);
    await connection.execute("DELETE FROM UserProgress WHERE user_id = ?;", [
      id,
    ]);
    console.log("deleteUser id", id);
    const [result] = await connection.execute(
      "DELETE FROM Users WHERE user_id = ?;",
      [id]
    );

    const header: ResultSetHeader = result as ResultSetHeader;

    await connection.commit();

    if (header.affectedRows === 0) {
      return null;
    }

    console.log("result", header);
    return { message: "User deleted", user: { userId: id } };
  } catch (e) {
    console.error("deleteUser error", e);
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }
};

const postProfilePic = async (userId: number, user_profile_pic: string) => {
  try {
      const [rows] = await promisePool.execute<RowDataPacket[] & User[]>(
          `
          UPDATE Users
          SET user_profile_pic = ?
          WHERE user_id = ?`, [user_profile_pic, userId]
      );
      console.log('rows', rows)
  } catch (e) {
      console.error('error', (e as Error).message);
      throw new Error((e as Error).message);
  }
};

const fetchProfilePic = async (pic: string) => {
  try {
      const [rows] = await promisePool.execute<RowDataPacket[] & User[]>(
          `
          SELECT user_profile_pic
          FROM Users
          WHERE user_profile_pic= ?`, [pic]
      );
      return rows[0].user_profile_pic;
  } catch (e) {
      console.error('error', (e as Error).message);
      throw new Error((e as Error).message);
  }
}

export {
  getUserById,
  getAllUsers,
  getUserByEmail,
  getUserByUsername,
  createUser,
  modifyUser,
  deleteUser,
  postProfilePic,
  fetchProfilePic
};
