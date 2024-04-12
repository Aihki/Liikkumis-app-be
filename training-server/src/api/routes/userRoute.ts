import express from 'express';
import {getProfilePic, updateProfilePic } from '../controllers/userController';


const router = express.Router();


router.post('/picture/:userId', updateProfilePic).get('/picture/:pic', getProfilePic);











export default router;