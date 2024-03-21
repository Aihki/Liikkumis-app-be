import {Request, Response} from 'express';
import { fetchProgress, postProgress, updateProgress } from '../models/progressModel';

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
        const progress = req.body;
        const addedProgress = await postProgress(progress);
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

export {getProgress, addProgress, modifyProgress};