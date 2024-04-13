import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import {FileInfo, TokenContent} from '@sharedTypes/DBTypes';
import {MessageResponse} from '@sharedTypes/MessageTypes';
import { log } from 'console';

const uploadFile = async (
  req: Request,
  res: Response<{}, {user: TokenContent}>,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      const err = new CustomError('file not valid', 400);
      next(err);
      return;
    }

    const fileInfo: FileInfo = {
      user_profile_pic: req.file.filename,
      user_id: res.locals.user.user_id,
    };

    const filename = `${jwt.sign(
      fileInfo,
      process.env.JWT_SECRET as string
    )}.${req.file.originalname.split('.').pop()}`;


    fs.renameSync(req.file.path, `${req.file.destination}/${filename}`);

    if (fs.existsSync(`${req.file.path}-thumb.png`)) {
      fs.renameSync(
        `${req.file.path}-thumb.png`,
        `${req.file.destination}/${filename}-thumb.png`
      );
    }
    console.log('filename', filename);
    const response = {
      message: 'file uploaded',
      data: {
        user_profile_pic: filename,
        user_id: res.locals.user.user_id,
      },
    };
    console.log('response', response);

    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

const deleteFile = async (
  req: Request<{filename: string}>,
  res: Response<MessageResponse, {user: TokenContent}>,
  next: NextFunction
) => {
  try {
    const filename = req.params.filename;
    if (!filename) {
      const err = new CustomError('filename not valid', 400);
      next(err);
      return;
    }

    // check if not admin
    if (res.locals.user.level_name !== 'Admin') {
      // get filename without extension for jwt verification
      // filename has multiple dots, so split by dot and remove last element
      const filenameWithoutExtension = filename
        .split('.')
        .slice(0, -1)
        .join('.');
      if (!filenameWithoutExtension) {
        const err = new CustomError('filename not valid', 400);
        next(err);
        return;
      }

      console.log('filenameWithoutExtension', filenameWithoutExtension);

      // check from token if user is owner of file
      const decodedTokenFromFileName = jwt.verify(
        filenameWithoutExtension,
        process.env.JWT_SECRET as string
      ) as FileInfo;
      console.log(decodedTokenFromFileName);
      console.log(res.locals.user.user_id);
      if (decodedTokenFromFileName.user_id !== res.locals.user.user_id) {
        const err = new CustomError('user not authorized', 401);
        next(err);
        return;
      }
    }

    // delete  from uploads folder
    if (fs.existsSync(`./uploads/${filename}-thumb.png`)) {
      fs.unlinkSync(`./uploads/${filename}-thumb.png`);
    }

    if (!fs.existsSync(`./uploads/${filename}`)) {
      const err = new CustomError('file not found', 404);
      next(err);
      return;
    }

    fs.unlinkSync(`./uploads/${filename}`);

    const response: MessageResponse = {
      message: 'File deleted',
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export {uploadFile, deleteFile};
