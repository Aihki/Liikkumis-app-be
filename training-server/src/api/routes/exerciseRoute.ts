import express from "express";
import { addExercise, getUsersSpecificExercise, getUsersExercise, modifySpecificExercise, removeExercise, getExercisesByWorkoutId, getDefaultExercise } from "../controllers/exercisesController";
import { authenticate } from "../../middlewares";

const router = express.Router();

router.get("/:userId", authenticate, getUsersExercise);
router.get("/", getDefaultExercise)
router.get("/:userId/:exerciseId", getUsersSpecificExercise);
router.get("/:userId/:userWorkoutId",authenticate, getExercisesByWorkoutId);
router.post("/", authenticate, addExercise);
router.put("/:userId/:exerciseId", modifySpecificExercise);
router.delete("/:userId/:exerciseId", authenticate, removeExercise);

export default router;
