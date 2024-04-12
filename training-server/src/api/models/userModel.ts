import { User } from "@sharedTypes/DBTypes";
import promisePool from "../../lib/db";
import { RowDataPacket } from "mysql2";



const postProfilePic = async (userId: number, user_profile_pic: string) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & User[]>(
            `
            UPDATE Users
            SET user_profile_pic = ?
            WHERE user_id = ?`, [user_profile_pic, userId]
        );
        console.log('rows', rows)
    } catch (e) {
        console.error('error', (e as Error).message);
        throw new Error((e as Error).message);
    }
};

const fetchProfilePic = async (pic: string) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[] & User[]>(
            `
            SELECT user_profile_pic
            FROM Users
            WHERE user_profile_pic= ?`, [pic]
        );
        return rows[0].user_profile_pic;
    } catch (e) {
        console.error('error', (e as Error).message);
        throw new Error((e as Error).message);
    }
}

export {postProfilePic, fetchProfilePic};