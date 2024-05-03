import {Request, Response} from 'express';
import { deleteFoodDiary, fetchFoodDiary, postFoodDiary, updateFoodDiary } from '../models/foodDiaryModel';
import { log } from 'console';

const getFoodDiary = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const foodDiary = await fetchFoodDiary(parseInt(userId));
        if (foodDiary) {
            res.status(200).json(foodDiary);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const addFoodDiary = async (req: Request, res: Response) => {
    try {
        const foodDiary = req.body;
        const {userId} = req.params;
        const addedFoodDiary = await postFoodDiary(parseInt(userId), foodDiary);
        console.log(addedFoodDiary);
        if (addedFoodDiary) {
            res.status(200).json(addedFoodDiary);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const modifyFoodDiary = async (req: Request, res: Response) => {
    try {
        const foodDiary = req.body;
        const {userId} = req.params;
        const updatedFoodDiary = await updateFoodDiary(parseInt(userId), foodDiary);
        if (updatedFoodDiary) {
            res.status(200).json(updatedFoodDiary);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const removeFoodDiary = async (req: Request, res: Response) => {
    try {
        const {userId, foodDiaryId} = req.params;
        const removedFoodDiary = await deleteFoodDiary(parseInt(userId), parseInt(foodDiaryId));
        if (removedFoodDiary) {
            res.status(200).json(removedFoodDiary);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

export {getFoodDiary, addFoodDiary, modifyFoodDiary, removeFoodDiary};