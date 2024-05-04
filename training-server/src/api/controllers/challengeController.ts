import {Request, Response} from 'express';
import { deleteChallenge, fetchChallengeById, fetchChallenges, fetchUserChallenges, hasUserJoinedChallenge, joinChallenge, leaveChallenge, patchChallenge, postChallenge, updateChallengeProgress } from '../models/challengeModel';


const getChallenges = async (req: Request, res: Response) => {
    try {
        const challenges = await fetchChallenges();
        if (challenges) {
            res.status(200).json(challenges);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const getChallengesByChallengeId = async (req: Request, res: Response) => {
    try {
        const { challengeId } = req.params;
        const challenge = await fetchChallengeById(parseInt(challengeId));
        if (challenge) {
            res.status(200).json(challenge);
            return;
        }
        res.status(404).json({ message: 'Challenge not found' });
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const getChallengesByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const challenges = await fetchUserChallenges(parseInt(userId));
        if (challenges) {
            res.status(200).json(challenges);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const createChallenge = async (req: Request, res: Response) => {
    try {
        const { challenge } = req.body;
        const newChallenge = await postChallenge(challenge);
        if (newChallenge) {
            res.status(201).json(newChallenge);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const deleteChallengeWhitChallengeId = async (req: Request, res: Response) => {
    try {
        const { challengeId } = req.params;
        const challenge = await deleteChallenge(parseInt(challengeId));
        if (challenge) {
            res.status(200).json(challenge);
            return;
        }
        res.status(404).json({ message: 'Challenge not found' });
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const joinChallengeWithUserId = async (req: Request, res: Response) => {
    try {
        const { challengeId } = req.params;
        const { user_id } = req.body;
        const challenge = await joinChallenge(parseInt(user_id), parseInt(challengeId));
        if (challenge) {
            res.status(200).json({ success: true });
            return;
        }
        res.status(404).json({ success: false, message: 'Challenge not found' });
    } catch (e) {
        res.status(500).json({ success: false, error: (e as Error).message });
    }
};

const updateChallenge = async (req: Request, res: Response) => {
    try {
        const { challenge } = req.body;
        if (!challenge || !challenge.challenge_id) {
            res.status(400).json({ message: 'Missing challenge data or challenge_id.' });
            return;
        }
        const updatedChallenge = await patchChallenge(challenge);
        if (updatedChallenge) {
            res.status(200).json(updatedChallenge);
            return;
        }
        res.status(404).json({ message: 'Challenge not found or no changes made.' });
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const leaveChallengeWithUserId = async (req: Request, res: Response) => {
    console.log(req.params)
    try {
        const { challengeId, userId } = req.params;
        const leftChallenge = await leaveChallenge(parseInt(userId), parseInt(challengeId));
        if (leftChallenge) {
            res.status(200).json({ success: true });
            return;
        }
        res.status(404).json({ success: false, message: 'Challenge not found' });
    } catch (e) {
        res.status(500).json({ success: false, error: (e as Error).message });
    }
};

const checkHasUserJoinedChallenge = async (req: Request, res: Response) => {
    try {
        const { userId, challengeId } = req.params;
        const hasJoined = await hasUserJoinedChallenge(parseInt(userId), parseInt(challengeId));
        res.status(200).json({ success: true, hasJoined: hasJoined });
    } catch (e) {
        console.error("Failed to check if user has joined challenge:", e);
        res.status(500).json({ success: false, error: (e as Error).message });
    }
};

const updateUserChallengeProgress = async (req: Request, res: Response) => {
    try {
        const { challengeId, userId } = req.params;
        const { progress } = req.body;

        const userIdNum = parseInt(userId);
        const challengeIdNum = parseInt(challengeId);
        const progressNum = parseFloat(progress);

        if (isNaN(userIdNum) || isNaN(challengeIdNum) || isNaN(progressNum)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const updated = await updateChallengeProgress(userIdNum, challengeIdNum, progressNum);

        if (updated) {
            return res.status(200).json({ success: true, message: 'Challenge progress updated successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'No updates made. Check if challenge exists and is not completed.' });
        }
    } catch (e) {
        console.error("Failed to update challenge progress:", e);
        res.status(500).json({ success: false, error: (e as Error).message });
    }
};


export {
    joinChallengeWithUserId,
    createChallenge,
    deleteChallengeWhitChallengeId,
    getChallengesByUserId,
    getChallengesByChallengeId,
    getChallenges,
    updateChallenge,
    leaveChallengeWithUserId,
    checkHasUserJoinedChallenge,
    updateUserChallengeProgress

}