import {Request, Response} from 'express';
import { addWorkout, deleteWorkout, fetchWorkoutByUserId, fetchWorkoutByWorkoutId, fetchWorkouts, updateWorkout } from '../models/workoutModel';

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

const getWokoutByWorkoutId = async (req: Request, res: Response) => {
    try {
        const {userId, workoutId} = req.params;
        const workout = await fetchWorkoutByWorkoutId(parseInt(workoutId), parseInt(userId));
        if (workout) {
            res.status(200).json(workout);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const postWorkout = async (req: Request, res: Response) => {
    try {
        const workout = req.body;
        const addedWorkout = await addWorkout(workout);
        res.json({ message: "Workout added successfully" });
        return;
        
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const modifyWorkout = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const { workoutId } = req.params;
        const name = req.body.workout_name;
        const description = req.body.workout_description;
        const workoutDate = req.body.workout_date;
        const updatedWorkout = await updateWorkout(parseInt(workoutId), name, description, workoutDate);
        if (updatedWorkout) {
            res.status(200).json(updatedWorkout);
            return;
        }
        res.status(404).json({ message: 'Workout not found or no changes made.' });
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

export {getWorkout, getWorkoutByUserId, getWokoutByWorkoutId, postWorkout, modifyWorkout, removeWorkout};