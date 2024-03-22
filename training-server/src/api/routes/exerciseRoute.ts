import express from "express";
import { addExercise, getUsersSpecificExercise, getUsersExercise, modifySpecificExercise, removeExercise } from "../controllers/exercisesController";

const router = express.Router();

router.get("/:userId", getUsersExercise);
router.get("/:userId/:exerciseId", getUsersSpecificExercise);
router.put("/:userId/:exerciseId", modifySpecificExercise);
router.post("/", addExercise);
router.delete("/:userId/:exerciseId", removeExercise);

export default router;
