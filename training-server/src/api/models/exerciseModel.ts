import { RowDataPacket } from "mysql2";
import promisePool from "../../lib/db";
import { Exercise } from "@sharedTypes/DBTypes";

const fetchUsersExercise = async (userId:number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
            `SELECT * FROM Exercises where user_id = ? OR user_id IS NULL`, [userId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};

const fetchDefaultExercise = async () => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
            `SELECT * FROM Exercises where user_id IS NULL`,
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
            `SELECT * FROM Exercises where user_id = ? and exercise_id = ?`, [userId, exerciseId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};

const fetchExercisesByWorkoutId = async (userId: number, userWorkoutId: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
            `SELECT * FROM Exercises WHERE user_id = ? AND user_workout_id = ?`, [userId, userWorkoutId]
        );
        if (rows.length === 0) {
            return [];
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message);
    }
};


const updateSpecificExercise = async (userId:number, exerciseId:number, exercise: Exercise) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
            `UPDATE Exercises SET ? WHERE user_id = ? and exercise_id = ?`, [exercise, userId, exerciseId]
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
            `INSERT INTO Exercises SET ? `, [exercise]
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
            `DELETE FROM Exercises WHERE user_id = ? and exercise_id = ?`, [userId, exerciseId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};


export { fetchUsersExercise, fetchDefaultExercise, fetchUsersSpecificExercise, fetchExercisesByWorkoutId, updateSpecificExercise, postExercise, deleteExercise };



