import { RowDataPacket } from "mysql2"
import promisePool from "../../lib/db"
import { UserWorkout } from "@sharedTypes/DBTypes"

const fetchWorkouts = async () => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
            `SELECT * FROM UserWorkouts`
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};


const fetchWorkoutByUserId = async (id: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
            `SELECT * FROM UserWorkouts WHERE user_id = ?`, [id]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};

const updateWorkout = async (id: number, name: string, description: string) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
            `UPDATE UserWorkouts SET workout_name = ?, workout_description = ? WHERE user_workout_id = ?`, [name, description, id]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};
        


const deleteWorkout = async (id: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
            `DELETE FROM UserWorkouts WHERE id = ?`, [id]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
}


export { fetchWorkouts, fetchWorkoutByUserId, updateWorkout ,deleteWorkout } 








