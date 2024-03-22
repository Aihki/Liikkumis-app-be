import {Request, Response} from 'express';
import { addWorkout, deleteWorkout, fetchWorkoutByUserId, fetchWorkouts, updateWorkout } from '../models/workoutModel';

const getWorkout = async (req: Request, res: Response) => {
    try {
        const workout = await fetchWorkouts();
        if (workout) {
            res.status(200).json(workout);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const getWorkoutByUserId = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const workout = await fetchWorkoutByUserId(parseInt(userId));
        if (workout) {
            res.status(200).json(workout);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const postWorkout = async (req: Request, res: Response) => {
    try {
        const workout = req.body;
        const addedWorkout = await addWorkout(workout);
        if (addedWorkout) {
            res.status(200).json(addedWorkout);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const modifyWorkout = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const name = req.body.name;
        const description = req.body.description;
        const updatedWorkout = await updateWorkout(parseInt(userId), name, description);
        if (updatedWorkout) {
            res.status(200).json(updatedWorkout);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const removeWorkout = async (req: Request, res: Response) => {
    try {
        const {userId, workout_id} = req.params;
        const removedWorkout = await deleteWorkout(parseInt(userId), parseInt(workout_id));
        if (removedWorkout) {
            res.status(200).json(removedWorkout);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

export {getWorkout, getWorkoutByUserId, postWorkout, modifyWorkout, removeWorkout};