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

const postExercise = async (exercise: Omit<Exercise, 'exercise_id' | 'created_at'>, userId: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[]>(
            `INSERT INTO Exercises (user_id, user_workout_id, exercise_name, exercise_weight, exercise_reps, exercise_sets, exercise_duration, exercise_distance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [userId, exercise.user_workout_id, exercise.exercise_name, exercise.exercise_weight, exercise.exercise_reps, exercise.exercise_sets, exercise.exercise_duration, exercise.exercise_distance]
        );
        
        if (exercise.exercise_weight > 0) {
            await addOrUpdatePersonalBest(userId, exercise.exercise_name, exercise.exercise_weight);
        }

        return rows;
    } catch (e) {
        throw new Error((e as Error).message);
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

const getPersonalBest = async (userId:number, exerciseName:string) => {
    try {
    const [rows] = await promisePool.execute<RowDataPacket[]>( `
        SELECT max_weight
        FROM PersonalBests
        WHERE user_id = ? AND exercise_name = ?
        ORDER BY max_weight DESC
        LIMIT 1
    `, [userId, exerciseName]
    );
    return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Error fetching personal best:', error);
        return null;
  }
};

const addOrUpdatePersonalBest = async (userId: number, exerciseName: string, weightLifted: number) => {
    try {
        const existingPB = await getPersonalBest(userId, exerciseName);

        if (existingPB && weightLifted > existingPB.max_weight) {
            const [updateRows] = await promisePool.execute(`
                UPDATE PersonalBests
                SET max_weight = ?, record_date = CURRENT_DATE()
                WHERE user_id = ? AND exercise_name = ?
            `, [weightLifted, userId, exerciseName]);
            return updateRows;
        } else if (!existingPB) {
            const [insertRows] = await promisePool.execute(`
                INSERT INTO PersonalBests (user_id, exercise_name, max_weight, record_date)
                VALUES (?, ?, ?, CURRENT_DATE())
            `, [userId, exerciseName, weightLifted]);
            return insertRows;
        }

        // If the weight lifted is not greater than the PB, do nothing
        return null;
    } catch (error) {
        console.error('Error adding or updating personal best:', error);
        throw new Error('Error adding or updating personal best');
    }
};



export { fetchUsersExercise, fetchDefaultExercise, fetchUsersSpecificExercise, fetchExercisesByWorkoutId, updateSpecificExercise, postExercise, deleteExercise, getPersonalBest, addOrUpdatePersonalBest };



