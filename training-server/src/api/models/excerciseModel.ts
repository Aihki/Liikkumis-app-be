import { RowDataPacket } from "mysql2";
import promisePool from "../../lib/db";
import { Exercise } from "@sharedTypes/DBTypes";

const fetchUsersExercise = async (userId:number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
            `SELECT * FROM Exercise where user_id = ? OR user_id IS NULL`, [userId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};

const fetchUsersSpecificExercise = async (userId:number, exerciseId:number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
            `SELECT * FROM Exercise where user_id = ? and exercise_id = ?`, [userId, exerciseId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};

const updateSpecificExercise = async (userId:number, exerciseId:number, exercise: Exercise) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
            `UPDATE Exercise SET ? WHERE user_id = ? and exercise_id = ?`, [exercise, userId, exerciseId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};

const postExercise = async (exercise: Exercise)=>{
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
            `INSERT INTO Exercise SET ?`, [exercise]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};

const deleteExercise = async (userId:number, exerciseId:number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
            `DELETE FROM Exercise WHERE user_id = ? and exercise_id = ?`, [userId, exerciseId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};


export {fetchUsersExercise, fetchUsersSpecificExercise, updateSpecificExercise, postExercise, deleteExercise};



