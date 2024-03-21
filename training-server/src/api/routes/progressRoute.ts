import express from 'express';
import { addProgress, getProgress, modifyProgress } from '../controllers/progressController';

const router = express.Router();

router.get('/:userId', getProgress);

router.post('/', addProgress);

router.put('/:userId', modifyProgress);











export default router;