import { RowDataPacket } from "mysql2";
import promisePool from "../../lib/db";
import { UserProgress } from "@sharedTypes/DBTypes";

const fetchProgress = async (userId: number) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & UserProgress[]>(
      `SELECT * FROM UserProgress WHERE user_id = ?`,
      [userId]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const postProgress = async (
  progress: Omit<UserProgress, "created_at" | "progress_id">, userId: number
) => {
    try {
    progress.progress_date = new Date(progress.progress_date);
    const [rows] = await promisePool.execute<RowDataPacket[]>(
      `
            INSERT INTO UserProgress (
                user_id,
                progress_date, 
                progress_weight, 
                progress_height, 
                progress_circumference_chest, 
                progress_circumference_waist, 
                progress_circumference_thigh_r, 
                progress_circumference_thigh_l, 
                progress_circumference_bicep_r, 
                progress_circumference_bicep_l, 
                progress_circumference_calves_r, 
                progress_circumference_calves_l
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            userId,
            progress.progress_date,
            progress.progress_weight,
            progress.progress_height,
            progress.progress_circumference_chest,
            progress.progress_circumference_waist,
            progress.progress_circumference_thigh_r,
            progress.progress_circumference_thigh_l,
            progress.progress_circumference_bicep_r,
            progress.progress_circumference_bicep_l,
            progress.progress_circumference_calves_r,
            progress.progress_circumference_calves_l,
            ]
    );
    return rows;
  } catch (e) {
    console.error((e as Error).message);
    throw new Error((e as Error).message);
  }
};

const updateProgress = async (userId: number, progress: UserProgress) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & UserProgress[]>(
      `UPDATE UserProgress SET ? WHERE user_id = ?`,
      [progress, userId]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};


const fetchNewstProgress = async (userId: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & UserProgress[]>(
            `SELECT * FROM UserProgress WHERE user_id = ? ORDER BY progress_date DESC LIMIT 1`,
            [userId]
        );
        if (rows.length === 0) {
            return null;
        }
        return rows;
    } catch (e) {
        throw new Error((e as Error).message);
    }
}

const fetchProgressByDate = async (userId: number, date: string) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & UserProgress[]>(
            `SELECT * FROM UserProgress WHERE user_id = ? AND progress_date = ?`,
            [userId, date]
        );
        if (rows.length === 0) {
            return null;
        }
        return rows;
    } catch (e) {
        throw new Error((e as Error).message);
    }
}

export { fetchProgress, postProgress, updateProgress, fetchNewstProgress, fetchProgressByDate};
