import express from 'express';
import { addFoodDiary, getFoodDiary, modifyFoodDiary, removeFoodDiary } from '../controllers/foodDiaryController';
import { updateFoodDiary } from '../models/foodDiaryModel';

const router = express.Router();


router.get('/:userId', getFoodDiary);

router.post('/:userId', addFoodDiary); 

router.put('/:userId', modifyFoodDiary);

router.delete('/:userId', removeFoodDiary);







export default router;