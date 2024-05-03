import { FieldPacket, RowDataPacket } from "mysql2";
import promisePool from "../../lib/db";
import { Exercise } from "@sharedTypes/DBTypes";
import { Pool } from "mysql2/typings/mysql/lib/Pool";

const fetchUsersExercise = async (userId: number) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
      `SELECT * FROM Exercises where user_id = ? OR user_id IS NULL`,
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

const fetchDefaultExercise = async () => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
      `SELECT * FROM Exercises where user_id IS NULL`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const fetchUsersSpecificExercise = async (
  userId: number,
  exerciseId: number
) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
      `SELECT * FROM Exercises where user_id = ? and exercise_id = ?`,
      [userId, exerciseId]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const fetchExercisesByWorkoutId = async (
  userId: number,
  userWorkoutId: number
) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
      `SELECT * FROM Exercises WHERE user_id = ? AND user_workout_id = ?`,
      [userId, userWorkoutId]
    );
    if (rows.length === 0) {
      return [];
    }
    return rows;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const updateSpecificExercise = async (
  userId: number,
  exerciseId: number,
  exercise: Exercise
) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
      `UPDATE Exercises SET ? WHERE user_id = ? and exercise_id = ?`,
      [exercise, userId, exerciseId]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const postExercise = async (
  exercise: Omit<Exercise, "exercise_id" | "created_at">,
  userId: number
) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[]>(
      `INSERT INTO Exercises (user_id, user_workout_id, exercise_name, exercise_weight, exercise_reps, exercise_sets, exercise_duration, exercise_distance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        exercise.user_workout_id,
        exercise.exercise_name,
        exercise.exercise_weight,
        exercise.exercise_reps,
        exercise.exercise_sets,
        exercise.exercise_duration,
        exercise.exercise_distance,
      ]
    );

    if (exercise.exercise_weight > 0) {
      await addOrUpdatePersonalBest(
        userId,
        exercise.exercise_name,
        exercise.exercise_weight
      );
    }

    return rows;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const deleteExercise = async (userId: number, exerciseId: number) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & Exercise[]>(
      `DELETE FROM Exercises WHERE user_id = ? and exercise_id = ?`,
      [userId, exerciseId]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const updateExerciseStatus = async (userId: number, exerciseId: number) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket [] & Exercise[]>(
      `UPDATE Exercises SET exercise_completed = 1 WHERE user_id = ? AND exercise_id = ?`,
      [userId, exerciseId]
    );
    if (rows.length === 0) {
      return null
    }
    return rows
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const getPersonalBest = async (userId: number, exerciseName: string) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[]>(
      `
        SELECT max_weight
        FROM PersonalBests
        WHERE user_id = ? AND exercise_name = ?
        ORDER BY max_weight DESC
        LIMIT 1
    `,
      [userId, exerciseName]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching personal best:", error);
    return null;
  }
};

const addOrUpdatePersonalBest = async (
  userId: number,
  exerciseName: string,
  weightLifted: number
) => {
  try {
    const existingPB = await getPersonalBest(userId, exerciseName);

    if (existingPB && weightLifted > existingPB.max_weight) {
      const [updateRows] = await promisePool.execute(
        `
                UPDATE PersonalBests
                SET max_weight = ?, record_date = CURRENT_DATE()
                WHERE user_id = ? AND exercise_name = ?
            `,
        [weightLifted, userId, exerciseName]
      );
      return updateRows;
    } else if (!existingPB) {
      const [insertRows] = await promisePool.execute(
        `
                INSERT INTO PersonalBests (user_id, exercise_name, max_weight, record_date)
                VALUES (?, ?, ?, CURRENT_DATE())
            `,
        [userId, exerciseName, weightLifted]
      );
      return insertRows;
    }
    return null;
  } catch (error) {
    console.error("Error adding or updating personal best:", error);
    throw new Error("Error adding or updating personal best");
  }
};

const comparePersonalBest = async (userId: number, exerciseName: string) => {
  try {
    const averageQuery = `
            SELECT AVG(max_weight) AS average_max_weight
            FROM PersonalBests
            WHERE exercise_name = ?
        `;

    const [averageResults, _]: [RowDataPacket[], FieldPacket[]] =
      await promisePool.execute(averageQuery, [exerciseName]);
    if (averageResults.length === 0) {
      throw new Error("No records found for the specified exercise");
    }

    const averageMaxWeight = averageResults[0].average_max_weight;
    if (!averageMaxWeight) {
      throw new Error("Failed to calculate average max weight");
    }

    const comparisonQuery = `
            SELECT
                user_id,
                exercise_name,
                max_weight,
                ? AS average_max_weight,
                ((max_weight - ?) / ?) * 100 AS percentage_above_average
            FROM PersonalBests
            WHERE user_id = ? AND exercise_name = ?;
        `;

    const [comparisonResults]: [RowDataPacket[], FieldPacket[]] =
      await promisePool.execute(comparisonQuery, [
        averageMaxWeight,
        averageMaxWeight,
        averageMaxWeight,
        userId,
        exerciseName,
      ]);

    return comparisonResults;
  } catch (error) {
    console.error("Error comparing personal best:", error);
    throw new Error("Error comparing personal best");
  }
};

const getPersonalBestForProfile = async (userId: number) => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[]>(
      `
        SELECT pb_id, exercise_name, max_weight, record_date, created_at
        FROM PersonalBests
        WHERE user_id = ?
        AND exercise_name IN ('Bench Press', 'Deadlift', 'Squat Rack Squats', 'Leg Press', 'Bicep Curls', 'Shoulder Press')
        ORDER BY exercise_name, record_date DESC;
        `,
      [userId]
    );
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error("Error getting the personal best");
    throw new Error("Error getting the personal best");
  }
};

const getLastMonthActivity = async (userId: number)  => {
  const query = `
  SELECT
  w.workout_date,
  w.workout_type,
  w.workout_name,
  COUNT(e.exercise_id) AS total_exercises
FROM
  UserWorkouts AS w
LEFT JOIN
  Exercises AS e ON w.user_workout_id = e.user_workout_id
WHERE
  w.user_id = ?
  AND w.workout_date >= DATE_FORMAT(NOW() ,'%Y-%m-01')
GROUP BY
  w.user_workout_id, w.workout_date, w.workout_type, w.workout_name
ORDER BY
  w.workout_date DESC;
  `;

  try {
      const [rows] = await promisePool.execute<RowDataPacket[]>(query, [userId]);
      return rows.length > 0 ? rows : null;
  } catch (error) {
      console.error("Error fetching last month's activity for user", userId, error);
      throw new Error("Failed to fetch activity data");
  }
};

export {
  fetchUsersExercise,
  fetchDefaultExercise,
  fetchUsersSpecificExercise,
  fetchExercisesByWorkoutId,
  updateSpecificExercise,
  postExercise,
  deleteExercise,
  updateExerciseStatus,
  getPersonalBest,
  addOrUpdatePersonalBest,
  comparePersonalBest,
  getPersonalBestForProfile,
  getLastMonthActivity
};
