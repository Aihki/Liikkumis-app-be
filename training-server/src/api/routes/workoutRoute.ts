import express from "express";
import {
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

router.get("/:userId", getWorkoutByUserId);

router.get("/popular/type", getMostPopularWorkoutType);

router.get("/completed/:userId", getCompletedWorkouts);

router.get("/status/:userId/:workoutId", getWorkoutStatus);

router.get("/:userId/:workoutId", getWorkoutByWorkoutId);

router.post("/", authenticate, postWorkout);

router.put("/:workoutId", modifyWorkout);

router.put("/completed/:workoutId", setWorkoutStatusToCompleted);

router.delete("/:userId/:workoutId", removeWorkout);

export default router;
