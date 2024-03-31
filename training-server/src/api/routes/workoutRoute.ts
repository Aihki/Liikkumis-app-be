import express from "express";
import {
  getWokoutByWorkoutId,
  getWorkout,
  getWorkoutByUserId,
  modifyWorkout,
  postWorkout,
  removeWorkout,
} from "../controllers/workoutController";
import { authenticate } from "../../middlewares";

const router = express.Router();

router.get("/", getWorkout);

router.get("/:userId", getWorkoutByUserId);

router.get("/:userId/:workoutId", getWokoutByWorkoutId);

router.post("/", authenticate, postWorkout);

router.put("/:workoutId", modifyWorkout);

router.delete("/:userId/:workoutId", removeWorkout);

export default router;
