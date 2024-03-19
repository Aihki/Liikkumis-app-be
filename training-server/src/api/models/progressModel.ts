import { RowDataPacket } from "mysql2";
import promisePool from "../../lib/db";
import { UserProgress } from "@sharedTypes/DBTypes";

const fetchProgress = async (userId: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & UserProgress[]>(
            `SELECT * FROM UserProgress WHERE user_id = ?`, [userId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};
const postProgress = async (progress: UserProgress) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & UserProgress[]>(
            `INSERT INTO UserProgress SET ?`, [progress]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
}

const updateProgress = async (userId: number, progress: UserProgress) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & UserProgress[]>(
            `UPDATE UserProgress SET ? WHERE user_id = ?`, [progress, userId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};




export {
    fetchProgress,
    postProgress,
    updateProgress
};

