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
  checkHasUserJoinedChallenge
} from "../controllers/challengeController";
import { authenticate } from "../../middlewares";

const router = express.Router();

// Get challenges
router.get("/", getChallenges);
router.get("/:challengeId", getChallengesByChallengeId);
router.get("/user/:userId", getChallengesByUserId);

// check if user is joined specific challenge
router.get("/check/:challengeId/:userId", authenticate, checkHasUserJoinedChallenge);

// Create a new challenge
router.post("/", authenticate, createChallenge);

// Update and delete a challenge
router.patch("/:challengeId", authenticate, updateChallenge);
router.delete("/:challengeId", authenticate, deleteChallengeWhitChallengeId);

// Join and leave a challenge
router.post("/:challengeId/join", authenticate, joinChallengeWithUserId);
router.delete("/leave/:challengeId/:userId", authenticate, leaveChallengeWithUserId);

export default router;
