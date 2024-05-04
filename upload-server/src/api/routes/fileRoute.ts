import express  from 'express';
import {deleteFile, uploadFile} from '../controllers/uploadController';
import multer, {FileFilterCallback} from 'multer';
import {authenticate, makeThumbnail} from '../../middlewares';
import path from 'path';

const fileFilter = (
  request: express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.includes('image') || file.mimetype.includes('video')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const uploadPath = path.join(__dirname, '..', '..', 'uploads');
console.log(`Saving uploaded files to: ${uploadPath}`);
const upload = multer({dest: uploadPath, fileFilter});
const router = express.Router();

/**
 * @api {post} /upload Upload File
 * @apiName UploadFile
 * @apiGroup File
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {File} file File to be uploaded. Supported file types: image, video.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {String} filename Name of the uploaded file.
 * @apiSuccess {String} thumbnail URL of the generated thumbnail (if applicable).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "File uploaded successfully",
 *       "filename": "example.jpg",
 *       "thumbnail": "https://example.com/thumbnails/example_thumb.jpg"
 *     }
 */

/**
 * @api {delete} /delete/:filename Delete File
 * @apiName DeleteFile
 * @apiGroup File
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} filename Name of the file to be deleted.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "File deleted successfully"
 *     }
 */
router
  .route('/upload')
  .post(authenticate, upload.single('file'), makeThumbnail, uploadFile);

router.route('/delete/:filename').delete(authenticate, deleteFile);

export default router;
