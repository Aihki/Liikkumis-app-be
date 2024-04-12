import {Request, Response} from 'express';
import { getUserCount, getUsers } from "../models/userModel";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        if (users) {
            res.status(200).json(users);
            return;
        }
    } catch (e) {
        res.status(500).json({error: (e as Error).message});
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
    getCountOfUsers
}