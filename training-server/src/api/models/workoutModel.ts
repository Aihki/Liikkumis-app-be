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
            `SELECT * FROM UserWorkouts WHERE user_id = ? ORDER BY created_at DESC`, [id]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};

const addWorkout = async (workout: UserWorkout) => {
    try {
        if (workout.user_id === undefined || workout.workout_name === undefined || workout.workout_description === undefined) {
            console.log(workout)
            throw new Error('One or more required workout fields are undefined');
          }
          
        const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
            `INSERT INTO UserWorkouts (user_id, workout_name, workout_description, workout_date) VALUES (?, ?, ?, ?)`, 
            [workout.user_id, workout.workout_name, workout.workout_description, workout.workout_date]
        );
        // Your existing code continues
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
        


const deleteWorkout = async (id: number, workout_id: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
            `DELETE FROM UserWorkouts WHERE id = ? AND user_workout_id = `, [id, workout_id]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
}


export { fetchWorkouts, fetchWorkoutByUserId, addWorkout, updateWorkout ,deleteWorkout } 








