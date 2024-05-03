import { ResultSetHeader, RowDataPacket } from "mysql2";
import promisePool from "../../lib/db";
import { FoodDiary } from "@sharedTypes/DBTypes";

const fetchFoodDiary = async (userId: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & FoodDiary[]>(
            `SELECT * FROM FoodDiary WHERE user_id = ?`, [userId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};

const postFoodDiary = async (userId: number, foodDiary: FoodDiary) => {
    try {
        const [insertResult] = await promisePool.execute<ResultSetHeader>(
            `INSERT INTO FoodDiary (user_id, food_diary_date, food_diary_notes, food_diary_ingredients, food_diary_meal, food_diary_calories) VALUES (?, ?, ?, ?, ?, ?)`, 
            [userId, foodDiary.food_diary_date, foodDiary.food_diary_notes, foodDiary.food_diary_ingredients, foodDiary.food_diary_meal, foodDiary.food_diary_calories]
        );

        
        if (insertResult.insertId) {
            const [rows] = await promisePool.query<RowDataPacket[] & FoodDiary[]>(
                `SELECT * FROM FoodDiary WHERE food_diary_id = ?`, 
                [insertResult.insertId]
            );

            if (rows.length > 0) {
                return rows[0];
            } else {
                return null; 
            }
        } else {
            return null;
        }
    } catch (e) {
        throw new Error((e as Error).message);
    }
};

const updateFoodDiary = async (userId: number, foodDiary: FoodDiary) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & FoodDiary[]>(
            `UPDATE FoodDiary SET ? WHERE user_id = ?`, [foodDiary, userId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};

const deleteFoodDiary = async (userId: number, foodDiaryId: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & FoodDiary[]>(
            `DELETE FROM FoodDiary WHERE user_id = ? AND food_diary_id = ?`, [userId, foodDiaryId]
        );
        if (rows.length === 0) {
            return null
        };
        return rows;
    } catch (e) {
        throw new Error((e as Error).message)
    }
};


export {fetchFoodDiary, postFoodDiary, updateFoodDiary, deleteFoodDiary};
