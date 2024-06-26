import {Request, Response} from 'express';
import {fetchProfilePic, postProfilePic, getUsers, getUserCount} from '../models/userModel'

const getProfilePic = async (req: Request, res: Response) => {
    try {
        const {pic} = req.params;
        const user = await fetchProfilePic(pic);
        res.status(200).json({user});
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
}

const updateProfilePic = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const picture = req.body.picture;
        await postProfilePic(parseInt(userId), picture);
        res.status(200).json({message: "Profile picture updated successfully"});
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        
    }
};

const getCountOfUsers = async (req: Request, res: Response) => {
    try {
        const count = await getUserCount();
        res.status(200).json({count});
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
    }
};


export {
    getAllUsers,
    getCountOfUsers,
    getProfilePic,
    updateProfilePic
    
}
