import {Request, Response} from 'express';
import { addWorkout, deleteWorkout, fetchWorkoutByUserId, fetchWorkoutByWorkoutId, fetchWorkouts, getCompletedWorkoutCount, getMPopularWorkoutType, getWorkoutStatusCompleted, getWorkoutWhitStatusCompleted, setWorkoutStatusCompleted, updateWorkout } from '../models/workoutModel';

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

const getWorkoutByWorkoutId = async (req: Request, res: Response) => {
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
        const {userId, workoutId} = req.params;
        const removedWorkout = await deleteWorkout(parseInt(userId), parseInt(workoutId));
        if (removedWorkout) {
            res.status(200).json(removedWorkout);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const setWorkoutStatusToCompleted = async (req: Request, res: Response) => {
    try {
        const { workoutId } = req.params;
        const updatedWorkout = await setWorkoutStatusCompleted(parseInt(workoutId));
        if (updatedWorkout) {
            res.status(200).json(updatedWorkout);
            return;
        }
        res.status(404).json({ message: 'Workout not found' });
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const getCompletedWorkouts = async (req: Request, res: Response) => {
    
    try {
        const { userId } = req.params;
        const workout = await getWorkoutWhitStatusCompleted(parseInt(userId));
        if (workout) {
            res.status(200).json(workout);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};


const getWorkoutStatus = async (req: Request, res: Response) => {
    const { userId, workoutId } = req.params;
    try {
        const workout = await getWorkoutStatusCompleted(parseInt(userId), parseInt(workoutId));
        if (workout === null || workout.length === 0) {
            res.json({workoutCompleted: false});
        } else {
            res.json({workoutCompleted: true});
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const getCountOfCompletedWorkouts = async (req: Request, res: Response) => {
    try {
        const count = await getCompletedWorkoutCount();
        res.status(200).json({count});
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const getMostPopularWorkoutType = async (req: Request, res: Response) => {
    try {
        const workout = await getMPopularWorkoutType();
        if (workout) {
            res.status(200).json(workout);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

export {
    getWorkout, 
    getWorkoutByUserId, 
    getWorkoutByWorkoutId, 
    postWorkout, 
    modifyWorkout, 
    removeWorkout, 
    setWorkoutStatusToCompleted, 
    getCompletedWorkouts,
    getWorkoutStatus,
    getCountOfCompletedWorkouts,
    getMostPopularWorkoutType
    };