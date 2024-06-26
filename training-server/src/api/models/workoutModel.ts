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
        `SELECT * FROM UserWorkouts WHERE user_id = ? AND workout_status = 'completed' ORDER BY created_at DESC`,
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

  const getWorkoutStatusCompleted = async (userId: number, workoutId: number)  => {
    try {
      const [rows] = await promisePool.execute<RowDataPacket[] & UserWorkout[]>(
        `SELECT * FROM UserWorkouts WHERE user_id = ? AND user_workout_id = ? AND workout_status = 'completed'`,
        [userId, workoutId]
      );
      if (rows.length === 0) {
        return null;
      }
      return rows;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  const getCompletedWorkoutCount = async () => {
    try {
        const [rows] = await promisePool.execute(
            `SELECT COUNT(*) FROM UserWorkouts WHERE workout_status = 'completed'`
        );
        return (rows as RowDataPacket[])[0]['COUNT(*)'];
        
        } catch (e) {
        throw new Error((e as Error).message);
    }
};

const getMPopularWorkoutType = async () => {
  try {
    const [rows] = await promisePool.execute(`
      SELECT workout_type, COUNT(*) AS count
      FROM UserWorkouts
      GROUP BY workout_type
      ORDER BY count DESC
      LIMIT 1
    `);
    return rows;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const fetchCompletedExercisesCount = async (userId: number, workoutId: number) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[]>(
      `SELECT COUNT(*) AS completed_exercises_count
       FROM Exercises
       WHERE user_id = ?
         AND user_workout_id = ?
         AND exercise_completed = 1;`,
      [userId, workoutId]
    );
    return rows[0].completed_exercises_count;
  } catch (error) {
    console.error('Error fetching completed exercises count:', error);
    throw new Error((error as Error).message);
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
  getWorkoutWhitStatusCompleted,
  getWorkoutStatusCompleted,
  getCompletedWorkoutCount,
  getMPopularWorkoutType,
  fetchCompletedExercisesCount
};
