import express from "express";
import { addExercise, getUsersSpecificExercise, getUsersExercise, modifySpecificExercise, removeExercise, getExercisesByWorkoutId, getDefaultExercise, getPersonalBestByExerciseName, getPbCompare, pBForProfile } from "../controllers/exercisesController";
import { authenticate } from "../../middlewares";

const router = express.Router();

/**
 * @api {get} /exercises/:userId Get user's exercises
 * @apiName GetUsersExercises
 * @apiGroup Exercises
 * 
 * @apiDescription Retrieve exercises for a specific user.
 * 
 * @apiParam {String} userId User's ID.
 * 
 * @apiSuccess {Object[]} exercises List of exercises for the user.
 * @apiSuccess {String} exercises.exerciseId Unique ID of the exercise.
 * @apiSuccess {String} exercises.name Name of the exercise.
 * @apiSuccess {String} exercises.description Description of the exercise.
 * @apiSuccess {Number} exercises.repCount Number of repetitions for the exercise.
 * @apiSuccess {Number} exercises.setCount Number of sets for the exercise.
 * @apiSuccess {Number} exercises.weight Weight used for the exercise (if applicable).
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "exerciseId": "1",
 *             "name": "Push-ups",
 *             "description": "A bodyweight exercise.",
 *             "repCount": 15,
 *             "setCount": 3,
 *             "weight": null
 *         },
 *         {
 *             "exerciseId": "2",
 *             "name": "Squats",
 *             "description": "A lower body exercise.",
 *             "repCount": 10,
 *             "setCount": 4,
 *             "weight": 50
 *         }
 *     ]
 */
router.get("/:userId", authenticate, getUsersExercise);

/**
 * @api {get} /exercises Get default exercises
 * @apiName GetDefaultExercises
 * @apiGroup Exercises
 * 
 * @apiDescription Retrieve default exercises.
 * 
 * @apiSuccess {Object[]} exercises List of default exercises.
 * @apiSuccess {String} exercises.exerciseId Unique ID of the exercise.
 * @apiSuccess {String} exercises.name Name of the exercise.
 * @apiSuccess {String} exercises.description Description of the exercise.
 * @apiSuccess {Number} exercises.repCount Number of repetitions for the exercise.
 * @apiSuccess {Number} exercises.setCount Number of sets for the exercise.
 * @apiSuccess {Number} exercises.weight Weight used for the exercise (if applicable).
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "exerciseId": "1",
 *             "name": "Push-ups",
 *             "description": "A bodyweight exercise.",
 *             "repCount": 15,
 *             "setCount": 3,
 *             "weight": null
 *         },
 *         {
 *             "exerciseId": "2",
 *             "name": "Squats",
 *             "description": "A lower body exercise.",
 *             "repCount": 10,
 *             "setCount": 4,
 *             "weight": 50
 *         }
 *     ]
 */
router.get("/", getDefaultExercise);

/**
 * @api {get} /exercises/:userId/:exerciseId Get user's specific exercise
 * @apiName GetUsersSpecificExercise
 * @apiGroup Exercises
 * 
 * @apiDescription Retrieve details of a specific exercise for a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} exerciseId Unique ID of the exercise.
 * 
 * @apiSuccess {Object} exercise Information about the specific exercise.
 * @apiSuccess {String} exercise.exerciseId Unique ID of the exercise.
 * @apiSuccess {String} exercise.name Name of the exercise.
 * @apiSuccess {String} exercise.description Description of the exercise.
 * @apiSuccess {Number} exercise.repCount Number of repetitions for the exercise.
 * @apiSuccess {Number} exercise.setCount Number of sets for the exercise.
 * @apiSuccess {Number} exercise.weight Weight used for the exercise (if applicable).
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "exerciseId": "1",
 *         "name": "Push-ups",
 *         "description": "A bodyweight exercise.",
 *         "repCount": 15,
 *         "setCount": 3,
 *         "weight": null
 *     }
 */
router.get("/:userId/:exerciseId", authenticate, getUsersSpecificExercise);

/**
 * @api {get} /exercises/:userId/workout/:userWorkoutId Get exercises by workout id
 * @apiName GetExercisesByWorkoutId
 * @apiGroup Exercises
 * 
 * @apiDescription Retrieve exercises for a specific workout of a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} userWorkoutId ID of the user's workout.
 * 
 * @apiSuccess {Object[]} exercises List of exercises for the specified workout.
 * @apiSuccess {String} exercises.exerciseId Unique ID of the exercise.
 * @apiSuccess {String} exercises.name Name of the exercise.
 * @apiSuccess {String} exercises.description Description of the exercise.
 * @apiSuccess {Number} exercises.repCount Number of repetitions for the exercise.
 * @apiSuccess {Number} exercises.setCount Number of sets for the exercise.
 * @apiSuccess {Number} exercises.weight Weight used for the exercise (if applicable).
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "exerciseId": "1",
 *             "name": "Push-ups",
 *             "description": "A bodyweight exercise.",
 *             "repCount": 15,
 *             "setCount": 3,
 *             "weight": null
 *         },
 *         {
 *             "exerciseId": "2",
 *             "name": "Squats",
 *             "description": "A lower body exercise.",
 *             "repCount": 10,
 *             "setCount": 4,
 *             "weight": 50
 *         }
 *     ]
 */
router.get("/:userId/workout/:userWorkoutId", getExercisesByWorkoutId);

/**
 * @api {get} /exercises/:userId/personal-best/:exerciseName Get personal best by exercise name
 * @apiName GetPersonalBestByExerciseName
 * @apiGroup Exercises
 * 
 * @apiDescription Retrieve personal best for a specific exercise of a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} exerciseName Name of the exercise.
 * 
 * @apiSuccess {Number} personalBest Personal best value for the exercise.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "personalBest": 100 // Example value
 *     }
 */
router.get("/:userId/personal-best/:exerciseName", authenticate, getPersonalBestByExerciseName);

/**
 * @api {get} /exercises/:userId/compare-pb/:exerciseName Get personal best compare
 * @apiName GetPbCompare
 * @apiGroup Exercises
 * 
 * @apiDescription Compare personal best with others for a specific exercise of a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} exerciseName Name of the exercise.
 * 
 * @apiSuccess {Object[]} comparison Comparison data.
 * @apiSuccess {String} comparison.userId User ID of the compared user.
 * @apiSuccess {String} comparison.username Username of the compared user.
 * @apiSuccess {Number} comparison.personalBest Personal best value of the compared user for the exercise.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "userId": "2",
 *             "username": "john_doe",
 *             "personalBest": 90
 *         },
 *         {
 *             "userId": "3",
 *             "username": "jane_doe",
 *             "personalBest": 95
 *         }
 *     ]
 */
router.get("/:userId/compare-pb/:exerciseName", getPbCompare);

/**
 * @api {get} /exercises/:userId/profile/personal-best Get personal best for profile
 * @apiName GetPersonalBestForProfile
 * @apiGroup Exercises
 * 
 * @apiDescription Retrieve personal best for a user's profile.
 * 
 * @apiParam {String} userId User's ID.
 * 
 * @apiSuccess {Object[]} personalBest Personal best data for the user's profile.
 * @apiSuccess {String} personalBest.exerciseName Name of the exercise.
 * @apiSuccess {Number} personalBest.personalBest Personal best value for the exercise.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "exerciseName": "Push-ups",
 *             "personalBest": 100
 *         },
 *         {
 *             "exerciseName": "Squats",
 *             "personalBest": 200
 *         }
 *     ]
 */
router.get("/:userId/profile/personal-best", pBForProfile);

/**
 * @api {post} /exercises/:userId Add exercise
 * @apiName AddExercise
 * @apiGroup Exercises
 * 
 * @apiDescription Add a new exercise for a user.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} name Name of the exercise.
 * @apiParam {String} description Description of the exercise.
 * @apiParam {Number} [repCount] Number of repetitions for the exercise.
 * @apiParam {Number} [setCount] Number of sets for the exercise.
 * @apiParam {Number} [weight] Weight used for the exercise (if applicable).
 * 
 * @apiSuccess {String} message Message indicating successful addition of the exercise.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Exercise added successfully."
 *     }
 */
router.post("/:userId", authenticate, addExercise);

/**
 * @api {put} /exercises/:userId/:exerciseId Modify specific exercise
 * @apiName ModifySpecificExercise
 * @apiGroup Exercises
 * 
 * @apiDescription Modify an existing exercise for a user.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} exerciseId Unique ID of the exercise to be modified.
 * @apiParam {String} [name] Updated name of the exercise.
 * @apiParam {String} [description] Updated description of the exercise.
 * @apiParam {Number} [repCount] Updated number of repetitions for the exercise.
 * @apiParam {Number} [setCount] Updated number of sets for the exercise.
 * @apiParam {Number} [weight] Updated weight used for the exercise (if applicable).
 * 
 * @apiSuccess {String} message Message indicating successful modification of the exercise.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Exercise modified successfully."
 *     }
 */
router.put("/:userId/:exerciseId", modifySpecificExercise);

/**
 * @api {delete} /exercises/:userId/:exerciseId Remove exercise
 * @apiName RemoveExercise
 * @apiGroup Exercises
 * 
 * @apiDescription Remove an existing exercise for a user.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} exerciseId Unique ID of the exercise to be removed.
 * 
 * @apiSuccess {String} message Message indicating successful removal of the exercise.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Exercise removed successfully."
 *     }
 */
router.delete("/:userId/:exerciseId", authenticate, removeExercise);


export default router;
