import express from 'express';
import { getWorkout, getWorkoutByUserId, modifyWorkout, postWorkout, removeWorkout } from '../controllers/workoutController';
import { authenticate } from '../../middlewares';

const router = express.Router();


router.get('/' ,getWorkout);

router.get('/:userId', getWorkoutByUserId);

router.post('/', authenticate, postWorkout);

router.put('/:userId/', modifyWorkout);

router.delete('/:userId', removeWorkout);






export default router;