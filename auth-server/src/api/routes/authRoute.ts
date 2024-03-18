import express from 'express';
import {login} from '../controllers/authController';
const router = express.Router();
import {body} from 'express-validator';

/**
 * @api {post} /auth/login User Login
 * @apiName UserLogin
 * @apiGroup Authentication
 *
 * @apiParam {String} username Username of the User.
 * @apiParam {String} password Password of the User.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "testi",
 *       "password": "12345"
 *     }
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {String} token User's authentication token.
 * @apiSuccess {Object} user User's information.
 * @apiSuccess {Number} user.userId User's unique ID.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Date} user.createdAt Timestamp when the user was created.
 * @apiSuccess {String} user.levelName User's level (Admin | User | Guest).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Login successful",
 *       "token": "dummy_token",
 *       "user": {
 *         "userId": 1,
 *         "username": "dummy_user",
 *         "email": "dummy_user@example.com",
 *         "createdAt": "2022-01-01T00:00:00.000Z",
 *         "levelName": "User"
 *       }
 *     }
 */
router.post(
  '/login',
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
  login
);

export default router;
