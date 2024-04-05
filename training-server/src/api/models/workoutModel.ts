import { RowDataPacket, ResultSetHeader } from "mysql2";
import promisePool from "../../lib/db";
import { UserWorkout } from "@sharedTypes/DBTypes";

const fetchWorkouts = async () => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
      `SELECT * FROM UserWorkouts`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const fetchWorkoutByUserId = async (id: number) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
      `SELECT * FROM UserWorkouts WHERE user_id = ? AND workout_status = 'pending' ORDER BY created_at DESC`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const fetchWorkoutByWorkoutId = async (userId: number, workoutId: number) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
      `SELECT * FROM UserWorkouts WHERE user_workout_id = ? AND user_id = ? `,
      [workoutId, userId]
    );
    return rows[0] || null;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const addWorkout = async (workout: UserWorkout) => {
  try {
    if (
      workout.user_id === undefined ||
      workout.workout_name === undefined ||
      workout.workout_description === undefined
    ) {
      console.log(workout);
      throw new Error("One or more required workout fields are undefined");
    }

    const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
      `INSERT INTO UserWorkouts (user_id, workout_name, workout_type, workout_description, workout_date) VALUES (?, ?, ?, ?, ?)`,
      [
        workout.user_id,
        workout.workout_name,
        workout.workout_type,
        workout.workout_description,
        workout.workout_date,
      ]
    );
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const updateWorkout = async (
  id: number,
  name: string,
  description: string,
  date: string
) => {
  try {
    const [result] = await promisePool.execute<ResultSetHeader>(
      `UPDATE UserWorkouts SET workout_name = ?, workout_description = ?, workout_date = ? WHERE user_workout_id = ?`,
      [name, description, date, id]
    );
    if (result.affectedRows === 0) {
      return null;
    }
    return result;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const deleteWorkout = async (userId: number, workoutId: number) => {
    try {
      const [deleteExercisesResult] = await promisePool.execute<ResultSetHeader>(
        `DELETE FROM Exercises WHERE user_workout_id = ?`,
        [workoutId]
      );
      const [deleteWorkoutResult] = await promisePool.execute<ResultSetHeader>(
        `DELETE FROM UserWorkouts WHERE user_id = ? AND user_workout_id = ?`,
        [userId, workoutId]
      );
      if (deleteWorkoutResult.affectedRows === 0) {
        return null;
      }
      return deleteWorkoutResult;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  const setWorkoutStatusCompleted = async (workoutId: number) => {
    try {
      const [result] = await promisePool.execute<ResultSetHeader>(
        `UPDATE UserWorkouts SET workout_status = 'completed' WHERE user_workout_id = ?`,
        [workoutId]
      );
      if (result.affectedRows === 0) {
        return null;
      }
      return result;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  
  }

  const getWorkoutWhitStatusCompleted = async (userId: number) => {
    try {
      const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
        `SELECT * FROM UserWorkouts WHERE user_id = ? AND workout_status = 'completed'`,
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


export {
  fetchWorkouts,
  fetchWorkoutByUserId,
  fetchWorkoutByWorkoutId,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  setWorkoutStatusCompleted,
  getWorkoutWhitStatusCompleted
};
