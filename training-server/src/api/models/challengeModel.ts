import { ResultSetHeader, RowDataPacket } from "mysql2";
import promisePool from "../../lib/db";
import { Challenge } from "@sharedTypes/DBTypes";


/**
 * Fetches all challenges from the database.
 * @returns {Promise<RowDataPacket[]>} - A promise that resolves to an array of challenges.
 */
const fetchChallenges = async () => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[]>(
            `SELECT * FROM Challenges`
        );
        return rows;
    } catch (e) {
        throw new Error((e as Error).message);
    }
}

/**
 * Fetches a challenge by its ID.
 * @param {number} challengeId - The ID of the challenge to fetch.
 * @returns {Promise<RowDataPacket>} - A promise that resolves to a single challenge object.
 */
const fetchChallengeById = async (challengeId: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[]>(
            `SELECT * FROM Challenges WHERE challenge_id = ?`,
            [challengeId]
        );
        // Check if any challenge is found
        if (rows.length === 0) {
            throw new Error('Challenge not found');
        }
        return rows[0];
    } catch (e) {
        throw new Error((e as Error).message);
    }
};

/**
 * Fetches all challenges that a user is participating in.
 * @param {number} userId - The ID of the user to fetch challenges for.
 * @returns {Promise<RowDataPacket[]>} - A promise that resolves to an array of challenges.
 */
const fetchUserChallenges = async (userId: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[]>(
            `SELECT * FROM UserChallenges WHERE user_id = ?`,
            [userId]
        );
        return rows;
    } catch (e) {
        throw new Error((e as Error).message);
    }
};

/**
 * Posts a new challenge to the database.
 * @param {Omit<Challenge, "challenge_id">} challenge - The challenge object to post.
 * @returns {Promise<RowDataPacket[]>} - A promise that resolves to the result of the insert operation.
 */
const postChallenge = async (challenge: Omit<Challenge, "challenge_id">) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[]>(
            `
            INSERT INTO Challenges (
                challenge_name,
                description,
                start_date,
                end_date,
                target_type,
                target_value,
                active
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
            [
                challenge.challenge_name,
                challenge.description,
                challenge.start_date,
                challenge.end_date,
                challenge.target_type,
                challenge.target_value,
                challenge.active
            ]
        );
        return rows;
    } catch (e) {
        console.error((e as Error).message);
        throw new Error((e as Error).message);
    }
};

/**
 * Updates an existing challenge in the database.
 * @param {Challenge} challenge - The challenge object to update.
 * @returns {Promise<RowDataPacket[]>} - A promise that resolves to the result of the update operation.
 */
const putChallenge = async (challenge: Challenge) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[]>(
            `
            UPDATE Challenges SET
                challenge_name = ?,
                description = ?,
                start_date = ?,
                end_date = ?,
                target_type = ?,
                target_value = ?,
                active = ?
            WHERE challenge_id = ?
        `,
            [
                challenge.challenge_name,
                challenge.description,
                challenge.start_date,
                challenge.end_date,
                challenge.target_type,
                challenge.target_value,
                challenge.active,
                challenge.challenge_id
            ]
        );
        return rows;
    } catch (e) {
        console.error((e as Error).message);
        throw new Error((e as Error).message);
    }
};

/**
 * Deletes a challenge from the database.
 * @param {number} challengeId - The ID of the challenge to delete.
 * @returns {Promise<RowDataPacket[]>} - A promise that resolves to the result of the delete operation.
 */
const deleteChallenge = async (challengeId: number) => {
    try {
        const [rows] = await promisePool.execute<RowDataPacket[]>(
            `DELETE FROM Challenges WHERE challenge_id = ?`,
            [challengeId]
        );
        return rows;
    } catch (e) {
        console.error((e as Error).message);
        throw new Error((e as Error).message);
    }
};

/**
 * Joins a user to a challenge by inserting a record into UserChallenges.
 * @param {number} userId - The ID of the user joining the challenge.
 * @param {number} challengeId - The ID of the challenge to join.
 * @returns {Promise<boolean>} - True if the operation was successful, otherwise throws an error.
 */
const joinChallenge = async (userId: number, challengeId: number): Promise<boolean> => {
    try {
        const [result] = await promisePool.execute<ResultSetHeader>(
            `INSERT INTO UserChallenges (user_id, challenge_id, start_date, progress, completed) VALUES (?, ?, CURDATE(), 0, FALSE)`,
            [userId, challengeId]
        );
        // If result  1 insert was successful
        return result.affectedRows === 1;
    } catch (e) {
        console.error("Failed to join challenge:", e);
        throw new Error((e as Error).message);
    }
};

/**
 * Updates a challenge in the database.
 * @param {Challenge} challenge - The challenge object to update.
 * @returns {Promise<RowDataPacket[]>} - A promise that resolves to the result of the update operation.
 */
const patchChallenge = async (challenge: Challenge) => {
    try {
        const { challenge_id, challenge_name, description, start_date, end_date, target_type, target_value, active } = challenge;
        const [rows] = await promisePool.execute<RowDataPacket[]>(
            `UPDATE Challenges SET 
                challenge_name = ?, 
                description = ?, 
                start_date = ?, 
                end_date = ?, 
                target_type = ?, 
                target_value = ?, 
                active = ?
             WHERE challenge_id = ?`,
            [challenge_name, description, start_date, end_date, target_type, target_value, active, challenge_id]
        );
        return rows;
    } catch (e) {
        console.error("Failed to update challenge:", e);
        throw new Error((e as Error).message);
    }
};


/**
 * Leaves a challenge by deleting the user's record from UserChallenges.
 * @param {number} userId - The ID of the user leaving the challenge.
 * @param {number} challengeId - The ID of the challenge to leave.
 * @returns {Promise<boolean>} - True if the operation was successful, otherwise throws an error.
 */
const leaveChallenge = async (userId: number, challengeId: number): Promise<boolean> => {
    try {
        const [result] = await promisePool.execute<ResultSetHeader>(
            `DELETE FROM UserChallenges WHERE user_id = ? AND challenge_id = ?`,
            [userId, challengeId]
        );
        return result.affectedRows === 1;
    } catch (e) {
        console.error("Failed to leave challenge:", e);
        throw new Error((e as Error).message);
    }
};

const hasUserJoinedChallenge = async (userId: number, challengeId: number): Promise<boolean> => {
    try {
        const [rows] = await promisePool.query<RowDataPacket[]>(
            `SELECT EXISTS (
                SELECT 1 FROM UserChallenges 
                WHERE user_id = ? AND challenge_id = ?
            ) AS 'joined'`,
            [userId, challengeId]
        );
        const hasJoined = rows[0].joined === 1; // `joined` will be 0 or 1 based on existence of the record
        return hasJoined;
    } catch (e) {
        console.error("Failed to check user challenge join status:", e);
        throw new Error((e as Error).message);
    }
};

export { 
    joinChallenge,
    fetchChallenges,
    fetchChallengeById,
    fetchUserChallenges,
    putChallenge,
    deleteChallenge,
    postChallenge,
    leaveChallenge,
    patchChallenge,
    hasUserJoinedChallenge
};