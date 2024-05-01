import express from "express";
import { addExercise, getUsersSpecificExercise, getUsersExercise, modifySpecificExercise, removeExercise, getExercisesByWorkoutId, getDefaultExercise, getPersonalBestByExerciseName, getPbCompare, pBForProfile, markExerciseAsDone } from "../controllers/exercisesController";
import { authenticate } from "../../middlewares";

const router = express.Router();

router.get("/:userId", authenticate, getUsersExercise);
router.get("/", getDefaultExercise)
router.get("/:userId/:exerciseId", getUsersSpecificExercise);
router.get("/:userId/workout/:userWorkoutId", getExercisesByWorkoutId);
router.get("/:userId/personal-best/:exerciseName", authenticate, getPersonalBestByExerciseName);
router.get("/:userId/compare-pb/:exerciseName", getPbCompare);
router.get("/:userId/profile/personal-best", pBForProfile)
router.post("/:userId", authenticate, addExercise);
router.put("/:userId/:exerciseId", modifySpecificExercise);
router.patch("/:userId/done/:exerciseId", markExerciseAsDone)
router.delete("/:userId/:exerciseId", authenticate, removeExercise);

export default router;
