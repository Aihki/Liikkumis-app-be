import express from 'express';
import { getWorkout, getWorkoutByUserId, modifyWorkout, postWorkout, removeWorkout } from '../controllers/workoutController';

const router = express.Router();


router.get('/' ,getWorkout);

router.get('/:userId', getWorkoutByUserId);

router.post('/', postWorkout);

router.put('/:userId/', modifyWorkout);

router.delete('/:userId', removeWorkout);






export default router;