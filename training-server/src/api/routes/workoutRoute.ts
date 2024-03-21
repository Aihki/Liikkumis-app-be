import express from 'express';
import { getWorkout, getWorkoutByUserId, modifyWorkout, removeWorkout } from '../controllers/workoutController';

const router = express.Router();


router.get('/' ,getWorkout);

router.get('/:userId', getWorkoutByUserId);

router.put('/:userId/', modifyWorkout);

router.delete('/:userId', removeWorkout);






export default router;