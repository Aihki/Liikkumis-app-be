import express from 'express';
import { getAllUsers, getCountOfUsers, getProfilePic, updateProfilePic } from '../controllers/userController';


const router = express.Router();


router.get('/', getAllUsers);
router.get('/count', getCountOfUsers);
router.post('/picture/:userId', updateProfilePic).get('/picture/:pic', getProfilePic);


export default router;