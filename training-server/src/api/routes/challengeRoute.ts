import express from "express";
import {
  createChallenge,
  getChallenges,
  getChallengesByChallengeId,
  getChallengesByUserId,
  joinChallengeWithUserId,
  leaveChallengeWithUserId,
  updateChallenge,
  deleteChallengeWhitChallengeId,
  checkHasUserJoinedChallenge,
  updateUserChallengeProgress
} from "../controllers/challengeController";
import { authenticate } from "../../middlewares";

const router = express.Router();

/**
 * @api {get} /challenges Get challenges
 * @apiName GetChallenges
 * @apiGroup Challenges
 * 
 * @apiDescription Retrieve all challenges.
 * 
 * @apiSuccess {Object[]} challenges List of challenges.
 * @apiSuccess {String} challenges.challengeId Unique ID of the challenge.
 * @apiSuccess {String} challenges.name Name of the challenge.
 * @apiSuccess {String} challenges.description Description of the challenge.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "challengeId": "1",
 *             "name": "30-Day Fitness Challenge",
 *             "description": "A month-long challenge to improve fitness."
 *         },
 *         {
 *             "challengeId": "2",
 *             "name": "No-Sugar Challenge",
 *             "description": "A challenge to eliminate added sugar from your diet."
 *         }
 *     ]
 */
router.get("/", getChallenges);

/**
 * @api {get} /challenges/:challengeId Get challenge by ID
 * @apiName GetChallengesByChallengeId
 * @apiGroup Challenges
 * 
 * @apiDescription Retrieve a challenge by its ID.
 * 
 * @apiParam {String} challengeId Unique ID of the challenge.
 * 
 * @apiSuccess {Object} challenge Information about the challenge.
 * @apiSuccess {String} challenge.challengeId Unique ID of the challenge.
 * @apiSuccess {String} challenge.name Name of the challenge.
 * @apiSuccess {String} challenge.description Description of the challenge.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "challengeId": "1",
 *         "name": "30-Day Fitness Challenge",
 *         "description": "A month-long challenge to improve fitness."
 *     }
 */
router.get("/:challengeId", getChallengesByChallengeId);

/**
 * @api {get} /challenges/user/:userId Get challenges by user ID
 * @apiName GetChallengesByUserId
 * @apiGroup Challenges
 * 
 * @apiDescription Retrieve challenges associated with a user.
 * 
 * @apiParam {String} userId User's ID.
 * 
 * @apiSuccess {Object[]} challenges List of challenges associated with the user.
 * @apiSuccess {String} challenges.challengeId Unique ID of the challenge.
 * @apiSuccess {String} challenges.name Name of the challenge.
 * @apiSuccess {String} challenges.description Description of the challenge.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "challengeId": "1",
 *             "name": "30-Day Fitness Challenge",
 *             "description": "A month-long challenge to improve fitness."
 *         }
 *     ]
 */
router.get("/user/:userId", getChallengesByUserId);

/**
 * @api {get} /challenges/check/:challengeId/:userId Check if user has joined a challenge
 * @apiName CheckHasUserJoinedChallenge
 * @apiGroup Challenges
 * 
 * @apiDescription Check if a user has joined a specific challenge.
 * 
 * @apiParam {String} challengeId Unique ID of the challenge.
 * @apiParam {String} userId User's ID.
 * 
 * @apiSuccess {Boolean} joined Indicates if the user has joined the challenge (true/false).
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "joined": true
 *     }
 */
router.get("/check/:challengeId/:userId", authenticate, checkHasUserJoinedChallenge);

/**
 * @api {post} /challenges Create a new challenge
 * @apiName CreateChallenge
 * @apiGroup Challenges
 * 
 * @apiDescription Create a new challenge.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} name Name of the challenge.
 * @apiParam {String} description Description of the challenge.
 * 
 * @apiSuccess {String} message Message indicating successful creation of the challenge.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Challenge created successfully."
 *     }
 */
router.post("/", authenticate, createChallenge);

/**
 * @api {patch} /challenges/:challengeId Update a challenge
 * @apiName UpdateChallenge
 * @apiGroup Challenges
 * 
 * @apiDescription Update an existing challenge.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} challengeId Unique ID of the challenge to be updated.
 * @apiParam {String} [name] Updated name of the challenge.
 * @apiParam {String} [description] Updated description of the challenge.
 * 
 * @apiSuccess {String} message Message indicating successful update of the challenge.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Challenge updated successfully."
 *     }
 */
router.patch("/:challengeId", authenticate, updateChallenge);

/**
 * @api {delete} /challenges/:challengeId Delete a challenge
 * @apiName DeleteChallenge
 * @apiGroup Challenges
 * 
 * @apiDescription Delete an existing challenge.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} challengeId Unique ID of the challenge to be deleted.
 * 
 * @apiSuccess {String} message Message indicating successful deletion of the challenge.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Challenge deleted successfully."
 *     }
 */
router.delete("/:challengeId", authenticate, deleteChallengeWhitChallengeId);

/**
 * @api {post} /challenges/:challengeId/join Join a challenge
 * @apiName JoinChallenge
 * @apiGroup Challenges
 * 
 * @apiDescription Join a specific challenge.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} challengeId Unique ID of the challenge to join.
 * 
 * @apiSuccess {String} message Message indicating successful joining of the challenge.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Successfully joined the challenge."
 *     }
 */
router.post("/:challengeId/join", authenticate, joinChallengeWithUserId);

/**
 * @api {delete} /challenges/leave/:challengeId/:userId Leave a challenge
 * @apiName LeaveChallenge
 * @apiGroup Challenges
 * 
 * @apiDescription Leave a specific challenge.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} challengeId Unique ID of the challenge to leave.
 * @apiParam {String} userId User's ID.
 * 
 * @apiSuccess {String} message Message indicating successful leaving of the challenge.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Successfully left the challenge."
 *     }
 */
router.delete("/leave/:challengeId/:userId", authenticate, leaveChallengeWithUserId);

/**
 * @api {put} /challenges/user/:userId/:challengeId/progress Update user challenge progress
 * @apiName UpdateUserChallengeProgress
 * @apiGroup Challenges
 * 
 * @apiDescription Update the progress of a user in a challenge.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} challengeId Unique ID of the challenge.
 * @apiParam {Number} progress Updated progress value.
 * 
 * @apiSuccess {String} message Message indicating successful update of user challenge progress.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "User challenge progress updated successfully."
 *     }
 */
router.put("/user/:userId/:challengeId/progress", authenticate, updateUserChallengeProgress);



export default router;
