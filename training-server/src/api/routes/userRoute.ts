import express from 'express';
import { getAllUsers, getCountOfUsers } from '../controllers/userController';

const router = express.Router();


router.get('/', getAllUsers);
router.get('/count', getCountOfUsers);


export default router;