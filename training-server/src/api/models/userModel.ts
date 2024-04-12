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

export { getUsers, getUserCount };
