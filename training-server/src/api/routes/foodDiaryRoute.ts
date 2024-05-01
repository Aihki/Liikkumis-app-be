import express from 'express';
import { addFoodDiary, getFoodDiary, modifyFoodDiary, removeFoodDiary } from '../controllers/foodDiaryController';
import { updateFoodDiary } from '../models/foodDiaryModel';

const router = express.Router();

/**
 * @api {get} /foodDiary/:userId Get user's food diary
 * @apiName GetUserFoodDiary
 * @apiGroup Food Diary
 * 
 * @apiDescription Retrieve the food diary entries of a user.
 * 
 * @apiParam {String} userId User's ID.
 * 
 * @apiSuccess {Object[]} foodDiary List of food diary entries.
 * @apiSuccess {String} foodDiary.foodDiaryId ID of the food diary entry.
 * @apiSuccess {String} foodDiary.date Date of the food diary entry (YYYY-MM-DD format).
 * @apiSuccess {String} foodDiary.mealType Type of meal (e.g., breakfast, lunch, dinner).
 * @apiSuccess {String} foodDiary.foodItem Name of the food item.
 * @apiSuccess {String} foodDiary.notes Additional notes about the food item.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "foodDiaryId": "1",
 *             "date": "2024-04-29",
 *             "mealType": "Breakfast",
 *             "foodItem": "Oatmeal",
 *             "notes": "With fruits and nuts"
 *         },
 *         {
 *             "foodDiaryId": "2",
 *             "date": "2024-04-29",
 *             "mealType": "Lunch",
 *             "foodItem": "Grilled Chicken Salad",
 *             "notes": "Dressing on the side"
 *         }
 *     ]
 */
router.get('/:userId', getFoodDiary);

/**
 * @api {post} /foodDiary/:userId Add food diary
 * @apiName AddFoodDiary
 * @apiGroup Food Diary
 * 
 * @apiDescription Add a food diary entry for a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} date Date of the food diary entry (YYYY-MM-DD format).
 * @apiParam {String} mealType Type of meal (e.g., breakfast, lunch, dinner).
 * @apiParam {String} foodItem Name of the food item.
 * @apiParam {String} [notes] Additional notes about the food item.
 * 
 * @apiSuccess {String} message Message indicating successful addition of food diary entry.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Food diary entry added successfully."
 *     }
 * 
 * @apiError BadRequest If the request parameters are invalid or incomplete.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "error": "Invalid or incomplete request parameters."
 *     }
 */

router.post('/:userId', addFoodDiary); 

/**
 * @api {put} /foodDiary/:userId Modify food diary
 * @apiName ModifyFoodDiary
 * @apiGroup Food Diary
 * 
 * @apiDescription Modify a food diary entry for a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} foodDiaryId ID of the food diary entry to be modified.
 * @apiParam {String} date Date of the food diary entry (YYYY-MM-DD format).
 * @apiParam {String} mealType Updated type of meal (e.g., breakfast, lunch, dinner).
 * @apiParam {String} foodItem Updated name of the food item.
 * @apiParam {String} [notes] Updated additional notes about the food item.
 * 
 * @apiSuccess {String} message Message indicating successful modification of food diary entry.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Food diary entry modified successfully."
 *     }
 * 
 * @apiError BadRequest If the request parameters are invalid or incomplete.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "error": "Invalid or incomplete request parameters."
 *     }
 */

router.put('/:userId', modifyFoodDiary);

/**
 * @api {delete} /foodDiary/:userId/:foodDiaryId Remove food diary
 * @apiName RemoveFoodDiary
 * @apiGroup Food Diary
 * 
 * @apiDescription Remove a food diary entry for a user.
 * 
 * @apiParam {String} userId User's ID.
 * @apiParam {String} foodDiaryId ID of the food diary entry to be removed.
 * 
 * @apiSuccess {String} message Message indicating successful removal of food diary entry.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Food diary entry removed successfully."
 *     }
 * 
 * @apiError NotFound If the specified food diary entry is not found.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "error": "Food diary entry not found."
 *     }
 */

router.delete('/:userId/:foodDiaryId', removeFoodDiary);





export default router;