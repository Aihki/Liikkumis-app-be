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


router.get("/", getWorkout);
router.get("/completed/count", getCountOfCompletedWorkouts);
router.get("/popular/type", getMostPopularWorkoutType);


router.post("/", authenticate, postWorkout);

// Specific workout routes
router.put("/:workoutId", modifyWorkout);
router.put("/completed/:workoutId", setWorkoutStatusToCompleted);

// Most specific routes early
router.get("/:workoutId/user/:userId/exercises/completed/count", getCompletedExercisesCount);
router.get("/status/:userId/:workoutId", getWorkoutStatus);
router.get("/completed/:userId", getCompletedWorkouts);
router.get("/user/:userId", getWorkoutByUserId);
router.get("/:userId/:workoutId", getWorkoutByWorkoutId);

router.delete("/:userId/:workoutId", removeWorkout);

export default router;
