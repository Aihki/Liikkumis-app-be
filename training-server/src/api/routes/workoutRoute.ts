import express from "express";
import {
  getCompletedWorkouts,
  getWorkout,
  getWorkoutByUserId,
  getWorkoutByWorkoutId,
  modifyWorkout,
  postWorkout,
  removeWorkout,
  setWorkoutStatusToCompleted,
} from "../controllers/workoutController";
import { authenticate } from "../../middlewares";

const router = express.Router();

router.get("/", getWorkout);

router.get("/:userId", getWorkoutByUserId);

router.get("/completed/:userId", getCompletedWorkouts);

router.get("/:userId/:workoutId", getWorkoutByWorkoutId);

router.post("/", authenticate, postWorkout);

router.put("/:workoutId", modifyWorkout);

router.put("/completed/:workoutId", setWorkoutStatusToCompleted);

router.delete("/:userId/:workoutId", removeWorkout);

export default router;
