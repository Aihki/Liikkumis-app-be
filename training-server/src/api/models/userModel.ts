import promisePool from "../../lib/db";
import { User } from "@sharedTypes/DBTypes";

import { RowDataPacket } from "mysql2";
// ...

const getUsers = async () => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM Users WHERE user_level_id != 1`
    );
    if (Array.isArray(rows) && (rows as RowDataPacket[]).length === 0) {
      return null;
    }
    return rows as RowDataPacket[];
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const getUserCount = async () => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT COUNT(*) FROM Users WHERE user_level_id != 1`
    );
    return (rows as RowDataPacket[])[0]["COUNT(*)"];
  } catch (e) {
    throw new Error((e as Error).message);
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

export {postProfilePic, fetchProfilePic, getUsers, getUserCount };
