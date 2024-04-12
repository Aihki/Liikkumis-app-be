import express from 'express';
import { addProgress, getNewstProgress, getProgressByDate, modifyProgress } from '../controllers/progressController';

const router = express.Router();

router.get('/:userId', getNewstProgress);

router.post('/:userId', addProgress);

router.put('/:userId', modifyProgress);

router.get('/:userId/:date', getProgressByDate);











export default router;