import express from "express";
import {
  getCompletedExercisesCount,
  getCompletedWorkouts,
  getCountOfCompletedWorkouts,
  getMostPopularWorkoutType,
  getWorkout,
  getWorkoutByUserId,
  getWorkoutByWorkoutId,
  getWorkoutStatus,
  modifyWorkout,
  postWorkout,
  removeWorkout,
  setWorkoutStatusToCompleted,
} from "../controllers/workoutController";
import { authenticate } from "../../middlewares";


const router = express.Router();


/**
 * @api {get} /workout Get all workouts
 * @apiName GetAllWorkouts
 * @apiGroup Workouts
 * 
 * @apiDescription Retrieve all workouts.
 * 
 * @apiSuccess {Object[]} workouts List of workouts.
 * @apiSuccess {String} workouts.workoutId Unique ID of the workout.
 * @apiSuccess {String} workouts.userId User ID associated with the workout.
 * @apiSuccess {String} workouts.date Date of the workout.
 * @apiSuccess {String} workouts.type Type of the workout.
 * @apiSuccess {String} workouts.duration Duration of the workout.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "workoutId": "1",
 *             "userId": "123",
 *             "date": "2024-04-29",
 *             "type": "Cardio",
 *             "duration": "30 minutes"
 *         },
 *         {
 *             "workoutId": "2",
 *             "userId": "456",
 *             "date": "2024-04-28",
 *             "type": "Strength Training",
 *             "duration": "45 minutes"
 *         }
 *     ]
 */
router.get("/", getWorkout);


/**
 * @api {get} /workout/completed/count Get count of completed workouts
 * @apiName GetCountOfCompletedWorkouts
 * @apiGroup Workouts
 * 
 * @apiDescription Retrieve the count of completed workouts.
 * 
 * @apiSuccess {Number} count Count of completed workouts.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "count": 10 // Example value
 *     }
 */
router.get("/completed/count", getCountOfCompletedWorkouts);


/**
 * @api {get} /workout/popular/type Get most popular workout type
 * @apiName GetMostPopularWorkoutType
 * @apiGroup Workouts
 * 
 * @apiDescription Retrieve the most popular workout type.
 * 
 * @apiSuccess {String} type Most popular workout type.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "type": "Strength Training" // Example value
 *     }
 */
router.get("/popular/type", getMostPopularWorkoutType);


/**
 * @api {post} /workout Add workout
 * @apiName AddWorkout
 * @apiGroup Workouts
 * 
 * @apiDescription Add a new workout for a user.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} date Date of the workout (format: "YYYY-MM-DD").
 * @apiParam {String} type Type of the workout.
 * @apiParam {String} duration Duration of the workout.
 * 
 * @apiSuccess {String} message Message indicating successful addition of the workout.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Workout added successfully."
 *     }
 */
router.post("/", authenticate, postWorkout);


/**
 * @api {put} /workout/:workoutId Modify workout
 * @apiName ModifyWorkout
 * @apiGroup Workouts
 * 
 * @apiDescription Modify an existing workout.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} workoutId Unique ID of the workout to be modified.
 * @apiParam {String} [date] Updated date of the workout (format: "YYYY-MM-DD").
 * @apiParam {String} [type] Updated type of the workout.
 * @apiParam {String} [duration] Updated duration of the workout.
 * 
 * @apiSuccess {String} message Message indicating successful modification of the workout.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Workout modified successfully."
 *     }
 */
router.put("/:workoutId", authenticate, modifyWorkout);


/**
 * @api {put} /workout/completed/:workoutId Set workout status to completed
 * @apiName SetWorkoutStatusToCompleted
 * @apiGroup Workouts
 * 
 * @apiDescription Set the status of a workout to completed.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} workoutId Unique ID of the workout to be marked as completed.
 * 
 * @apiSuccess {String} message Message indicating successful update of the workout status.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Workout status updated to completed."
 *     }
 */
router.put("/completed/:workoutId", authenticate, setWorkoutStatusToCompleted);


/**
 * @api {get} /workout/:workoutId/user/:userId/exercises/completed/count Get count of completed exercises
 * @apiName GetCompletedExercisesCount
 * @apiGroup Workouts
 * 
 * @apiDescription Retrieve the count of completed exercises for a specific workout and user.
 * 
 * @apiParam {String} workoutId Unique ID of the workout.
 * @apiParam {String} userId User's ID.
 * 
 * @apiSuccess {Number} count Count of completed exercises.
 * 
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *      "count": 5 // Example value
 *  }
 */
router.get("/:workoutId/user/:userId/exercises/completed/count", getCompletedExercisesCount);

/**
 * @api {get} /workout/status/:userId/:workoutId Get workout status
 * @apiName GetWorkoutStatus
 * @apiGroup Workouts
 * 
 * @apiDescription Retrieve the status of a specific workout for a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} workoutId Unique ID of the workout.
 * 
 * @apiSuccess {String} status Status of the workout (e.g., "completed").
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": "completed" // Example value
 *     }
 */
router.get("/status/:userId/:workoutId", getWorkoutStatus);

/**
 * @api {get} /workout/completed/:userId Get completed workouts
 * @apiName GetCompletedWorkouts
 * @apiGroup Workouts
 * 
 * @apiDescription Retrieve completed workouts for a specific user.
 * 
 * @apiParam {String} userId User's ID.
 * 
 * @apiSuccess {Object[]} completedWorkouts List of completed workouts for the user.
 * @apiSuccess {String} completedWorkouts.workoutId Unique ID of the completed workout.
 * @apiSuccess {String} completedWorkouts.date Date of the completed workout.
 * @apiSuccess {String} completedWorkouts.type Type of the completed workout.
 * @apiSuccess {String} completedWorkouts.duration Duration of the completed workout.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "workoutId": "1",
 *             "date": "2024-04-29",
 *             "type": "Cardio",
 *             "duration": "30 minutes"
 *         },
 *         {
 *             "workoutId": "2",
 *             "date": "2024-04-28",
 *             "type": "Strength Training",
 *             "duration": "45 minutes"
 *         }
 *     ]
 */
router.get("/completed/:userId", getCompletedWorkouts);



/**
 * @api {get} /workout/:userId Get workout by user id
 * @apiName GetWorkoutByUserId
 * @apiGroup Workouts
 * 
 * @apiDescription Retrieve workouts for a specific user.
 * 
 * @apiParam {String} userId User's ID.
 * 
 * @apiSuccess {Object[]} workouts List of workouts for the user.
 * @apiSuccess {String} workouts.workoutId Unique ID of the workout.
 * @apiSuccess {String} workouts.date Date of the workout.
 * @apiSuccess {String} workouts.type Type of the workout.
 * @apiSuccess {String} workouts.duration Duration of the workout.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "workoutId": "1",
 *             "date": "2024-04-29",
 *             "type": "Cardio",
 *             "duration": "30 minutes"
 *         },
 *         {
 *             "workoutId": "2",
 *             "date": "2024-04-28",
 *             "type": "Strength Training",
 *             "duration": "45 minutes"
 *         }
 *     ]
 */
router.get("/user/:userId", getWorkoutByUserId);






/**
 * @api {get} /workout/:userId/:workoutId Get workout by workout id
 * @apiName GetWorkoutByWorkoutId
 * @apiGroup Workouts
 * 
 * @apiDescription Retrieve details of a specific workout for a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} workoutId Unique ID of the workout.
 * 
 * @apiSuccess {String} date Date of the workout.
 * @apiSuccess {String} type Type of the workout.
 * @apiSuccess {String} duration Duration of the workout.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "date": "2024-04-29",
 *         "type": "Cardio",
 *         "duration": "30 minutes"
 *     }
 */
router.get("/:userId/:workoutId", getWorkoutByWorkoutId);



/**
 * @api {delete} /workout/:userId/:workoutId Remove workout
 * @apiName RemoveWorkout
 * @apiGroup Workouts
 * 
 * @apiDescription Remove an existing workout for a user.
 * 
 * @apiHeader {String} Authorization User's access token.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} workoutId Unique ID of the workout to be removed.
 * 
 * @apiSuccess {String} message Message indicating successful removal of the workout.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Workout removed successfully."
 *     }
 */
router.delete("/:userId/:workoutId", authenticate, removeWorkout);


export default router;
