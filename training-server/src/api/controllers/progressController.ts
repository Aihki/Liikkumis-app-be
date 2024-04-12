import {Request, Response} from 'express';
import { fetchNewstProgress, fetchProgress, fetchProgressByDate, postProgress, updateProgress } from '../models/progressModel';

const getProgress = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const progress = await fetchProgress(parseInt(userId));
        if (progress) {
            res.status(200).json(progress);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const addProgress = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId); 
        const progress = req.body;
        console.log('progress', progress)
        const addedProgress = await postProgress(progress, userId);
        if (addedProgress) {
            res.status(200).json(addedProgress);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const modifyProgress = async (req: Request, res: Response) => {
    try {
        const progress = req.body;
        const {userId} = req.params;
        const updatedProgress = await updateProgress(parseInt(userId), progress);
        if (updatedProgress) {
            res.status(200).json(updatedProgress);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}
const getNewstProgress = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const progress = await fetchNewstProgress(parseInt(userId));
        if (progress) {
            res.status(200).json(progress);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const getProgressByDate = async (req: Request, res: Response) => {
    try {
        const {userId, date} = req.params;

        // Convert date to YYYY-MM-DD format
        const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;

        const progress = await fetchProgressByDate(parseInt(userId), formattedDate);
        if (progress) {
            res.status(200).json(progress);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

export {getProgress, addProgress, modifyProgress, getNewstProgress, getProgressByDate};