import {Request, Response} from 'express';
import { deleteExercise, fetchDefaultExercise, fetchExercisesByWorkoutId, fetchUsersExercise, fetchUsersSpecificExercise, postExercise, updateSpecificExercise } from '../models/exerciseModel';


const getUsersExercise = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const exercise = await fetchUsersExercise(parseInt(userId));
        if (exercise) {
            res.status(200).json(exercise);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const getDefaultExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await fetchDefaultExercise();
        if (exercise) {
            res.status(200).json(exercise);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const getUsersSpecificExercise = async (req: Request, res: Response) => {
    try {
        const {userId, exerciseId} = req.params;
        const exercise = await fetchUsersSpecificExercise(parseInt(userId), parseInt(exerciseId));
        if (exercise) {
            res.status(200).json(exercise);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const getExercisesByWorkoutId = async (req: Request, res: Response) => {
    try {
        const {userId, userWorkoutId} = req.params;
        const exercise = await fetchExercisesByWorkoutId(parseInt(userId), parseInt(userWorkoutId));
        if (exercise) {
            res.status(200).json(exercise);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const modifySpecificExercise = async (req: Request, res: Response) => {
    try {
        const {userId, exerciseId} = req.params;
        const exercise = req.body;
        const updatedExercise = await updateSpecificExercise(parseInt(userId), parseInt(exerciseId), exercise);
        if (updatedExercise) {
            res.status(200).json(updatedExercise);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const addExercise = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.params);
    try {
        const userId = Number(req.params.userId); 
        const exercise = req.body;
        const addedExercise = await postExercise(exercise, userId);
        if (addedExercise) {
            res.status(200).json(addedExercise);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}


const removeExercise = async (req: Request, res: Response) => {
    try {
        const {userId, exerciseId} = req.params;
        const deletedExercise = await deleteExercise(parseInt(userId), parseInt(exerciseId));
        if (deletedExercise) {
            res.status(200).json(deletedExercise);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

export {
    getUsersExercise,
    getDefaultExercise,
    getUsersSpecificExercise,
    getExercisesByWorkoutId,
    modifySpecificExercise,
    addExercise,
    removeExercise
};