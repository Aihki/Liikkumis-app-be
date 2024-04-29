import express from 'express';
import { getAllUsers, getCountOfUsers, getProfilePic, updateProfilePic } from '../controllers/userController';


const router = express.Router();


/**
 * @api {get} /users Get all users
 * @apiName GetAllUsers
 * @apiGroup Users
 * 
 * @apiDescription Retrieve information about all users.
 * 
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {String} users.userId The ID of the user.
 * @apiSuccess {String} users.username The username of the user.
 * @apiSuccess {String} users.email The email address of the user.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "userId": "1",
 *             "username": "example1",
 *             "email": "example1@example.com"
 *         },
 *         {
 *             "userId": "2",
 *             "username": "example2",
 *             "email": "example2@example.com"
 *         }
 *     ]
 */
router.get('/', getAllUsers);

/**
 * @api {get} /users/count Get count of users
 * @apiName GetCountOfUsers
 * @apiGroup Users
 * 
 * @apiDescription Get the total count of users.
 * 
 * @apiSuccess {Number} count Total count of users.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "count": 10
 *     }
 */
router.get('/count', getCountOfUsers);

/**
 * @api {post} /users/picture/:userId Update profile picture
 * @apiName UpdateProfilePicture
 * @apiGroup Users
 * 
 * @apiDescription Update the profile picture of a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {File} picture New profile picture file.
 * 
 * @apiSuccess {String} message Message indicating successful update of profile picture.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Profile picture updated successfully."
 *     }
 */

/**
 * @api {get} /users/picture/:pic Get profile picture
 * @apiName GetProfilePicture
 * @apiGroup Users
 * 
 * @apiDescription Get the profile picture of a user.
 * 
 * @apiParam {String} pic Filename of the profile picture.
 * 
 * @apiSuccess {File} picture Profile picture file.
 * 
 * @apiSuccessExample {binary} Success-Response:
 *     HTTP/1.1 200 OK
 *     <Binary data>
 */
router.post('/picture/:userId', updateProfilePic).get('/picture/:pic', getProfilePic);



export default router;