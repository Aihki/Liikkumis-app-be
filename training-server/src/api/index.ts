import express, {Request, Response} from 'express';
import foodDiaryRoute from './routes/foodDiaryRoute';
import workoutRoute from './routes/workoutRoute';
import excerciseRoute from './routes/excerciseRoute';
import progressRoute from './routes/progressRoute';
import userRoute from './routes/userRoute';


const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'training api v1',
  });
});


router.use('/food-diaries', foodDiaryRoute);
router.use('/workouts', workoutRoute);
router.use('/excercises', excerciseRoute);
router.use('/progress-records', progressRoute);
router.use('/users', userRoute);


export default router;
