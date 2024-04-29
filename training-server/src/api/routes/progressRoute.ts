import express from 'express';
import { addProgress, getNewstProgress, getProgressByDate, modifyProgress } from '../controllers/progressController';

const router = express.Router();

/**
 * @api {get} /progress/:userId Get user's progress
 * @apiName GetUserProgress
 * @apiGroup Progress
 * 
 * @apiDescription Retrieve the progress of a user.
 * 
 * @apiParam {String} userId User's ID.
 * 
 * @apiSuccess {Object} progress User's progress data.
 * @apiSuccess {String} progress.date Date of the progress entry.
 * @apiSuccess {Number} progress.progress_weight Weight progress.
 * @apiSuccess {Number} progress.progress_height Height progress.
 * @apiSuccess {Number} progress.progress_circumference_chest Chest circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_waist Waist circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_thigh_r Right thigh circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_thigh_l Left thigh circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_bicep_r Right bicep circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_bicep_l Left bicep circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_calves_r Right calves circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_calves_l Left calves circumference progress.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "date": "2024-04-29",
 *         "progress_weight": 70,
 *         "progress_height": 175,
 *         "progress_circumference_chest": 100,
 *         "progress_circumference_waist": 80,
 *         "progress_circumference_thigh_r": 60,
 *         "progress_circumference_thigh_l": 60,
 *         "progress_circumference_bicep_r": 35,
 *         "progress_circumference_bicep_l": 35,
 *         "progress_circumference_calves_r": 40,
 *         "progress_circumference_calves_l": 40
 *     }
 */
router.get('/:userId', getNewstProgress);

/**
 * @api {post} /progress/:userId Add progress
 * @apiName AddProgress
 * @apiGroup Progress
 * 
 * @apiDescription Add a progress entry for a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} date Date of the progress entry (YYYY-MM-DD format).
 * @apiParam {Number} progress_weight Weight progress.
 * @apiParam {Number} progress_height Height progress.
 * @apiParam {Number} progress_circumference_chest Chest circumference progress.
 * @apiParam {Number} progress_circumference_waist Waist circumference progress.
 * @apiParam {Number} progress_circumference_thigh_r Right thigh circumference progress.
 * @apiParam {Number} progress_circumference_thigh_l Left thigh circumference progress.
 * @apiParam {Number} progress_circumference_bicep_r Right bicep circumference progress.
 * @apiParam {Number} progress_circumference_bicep_l Left bicep circumference progress.
 * @apiParam {Number} progress_circumference_calves_r Right calves circumference progress.
 * @apiParam {Number} progress_circumference_calves_l Left calves circumference progress.
 * 
 * @apiSuccess {String} message Message indicating successful addition of progress.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Progress added successfully."
 *     }
 */
router.post('/:userId', addProgress);

/**
 * @api {put} /progress/:userId Modify progress
 * @apiName ModifyProgress
 * @apiGroup Progress
 * 
 * @apiDescription Modify a progress entry for a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} date Date of the progress entry (YYYY-MM-DD format).
 * @apiParam {Number} progress_weight Updated weight progress.
 * @apiParam {Number} progress_height Updated height progress.
 * @apiParam {Number} progress_circumference_chest Updated chest circumference progress.
 * @apiParam {Number} progress_circumference_waist Updated waist circumference progress.
 * @apiParam {Number} progress_circumference_thigh_r Updated right thigh circumference progress.
 * @apiParam {Number} progress_circumference_thigh_l Updated left thigh circumference progress.
 * @apiParam {Number} progress_circumference_bicep_r Updated right bicep circumference progress.
 * @apiParam {Number} progress_circumference_bicep_l Updated left bicep circumference progress.
 * @apiParam {Number} progress_circumference_calves_r Updated right calves circumference progress.
 * @apiParam {Number} progress_circumference_calves_l Updated left calves circumference progress.
 * 
 * @apiSuccess {String} message Message indicating successful modification of progress.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Progress modified successfully."
 *     }
 */
router.put('/:userId', modifyProgress);

/**
 * @api {get} /progress/:userId/:date Get progress by date
 * @apiName GetProgressByDate
 * @apiGroup Progress
 * 
 * @apiDescription Retrieve the progress of a user for a specific date.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} date Date of the progress entry (YYYY-MM-DD format).
 * 
 * @apiSuccess {Object} progress Progress entry for the specified date.
 * @apiSuccess {String} progress.date Date of the progress entry.
 * @apiSuccess {Number} progress.progress_weight Weight progress.
 * @apiSuccess {Number} progress.progress_height Height progress.
 * @apiSuccess {Number} progress.progress_circumference_chest Chest circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_waist Waist circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_thigh_r Right thigh circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_thigh_l Left thigh circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_bicep_r Right bicep circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_bicep_l Left bicep circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_calves_r Right calves circumference progress.
 * @apiSuccess {Number} progress.progress_circumference_calves_l Left calves circumference progress.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "date": "2024-04-29",
 *         "progress_weight": 70,
 *         "progress_height": 175,
 *         "progress_circumference_chest": 100,
 *         "progress_circumference_waist": 80,
 *         "progress_circumference_thigh_r": 60,
 *         "progress_circumference_thigh_l": 60,
 *         "progress_circumference_bicep_r": 35,
 *         "progress_circumference_bicep_l": 35,
 *         "progress_circumference_calves_r": 40,
 *         "progress_circumference_calves_l": 40
 *     }
 */
router.get('/:userId/:date', getProgressByDate);


export default router;