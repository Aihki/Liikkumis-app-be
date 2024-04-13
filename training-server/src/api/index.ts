import express, {Request, Response} from 'express';
import foodDiaryRoute from './routes/foodDiaryRoute';
import workoutRoute from './routes/workoutRoute';
import exerciseRoute from './routes/exerciseRoute';
import progressRoute from './routes/progressRoute';
import userRoute from './routes/userRoute';
import challengeRoute from './routes/challengeRoute';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'training api v1',
  });
});


router.use('/fooddiary', foodDiaryRoute);
router.use('/workouts', workoutRoute);
router.use('/exercises', exerciseRoute);
router.use('/progress', progressRoute);
router.use('/users', userRoute);
router.use('/challenge', challengeRoute);



export default router;
