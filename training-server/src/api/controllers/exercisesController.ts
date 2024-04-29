import {Request, Response} from 'express';
import { addOrUpdatePersonalBest, comparePersonalBest, deleteExercise, fetchDefaultExercise, fetchExercisesByWorkoutId, fetchUsersExercise, fetchUsersSpecificExercise, getPersonalBest, getPersonalBestForProfile, postExercise, updateSpecificExercise } from '../models/exerciseModel';


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

const getPersonalBestByExerciseName = async (req: Request, res: Response) => {
    try {
        const { userId, exerciseName } = req.params;
        const personalBest = await getPersonalBest(parseInt(userId), exerciseName);

        if (personalBest) {
            res.json(personalBest);
        } else {
            res.status(404).json({ message: "No personal best found or updated." });
        }
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }   
};

const getPbCompare = async (req: Request, res: Response) => {
    try {
        const { userId, exerciseName } = req.params;
        const personalBest = await comparePersonalBest(parseInt(userId), exerciseName);

        if (personalBest) {
            res.json(personalBest);
        } else {
            res.status(404).json({ message: "No personal best found or updated." });
        }
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
};


const pBForProfile = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const personalBest = await getPersonalBestForProfile(parseInt(userId));
        res.json(personalBest).status(200);
    } catch (error) {
        res.status(500).json({message: 'No personal best found'})
    }
};




export {
    getUsersExercise,
    getDefaultExercise,
    getUsersSpecificExercise,
    getExercisesByWorkoutId,
    modifySpecificExercise,
    addExercise,
    removeExercise,
    getPersonalBestByExerciseName,
    getPbCompare,
    pBForProfile
};