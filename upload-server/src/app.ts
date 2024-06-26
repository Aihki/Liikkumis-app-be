require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import {notFound, errorHandler} from './middlewares';
import api from './api';
import path from 'path';

const app = express();

app.use(morgan('dev'));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'"],
    },
  })
);
app.use(cors());
app.use(express.json());

const uploadsDir = '/home/liikkuapp/Liikkumis-app-be/upload-server/dist/upload-server/src/uploads';
app.use('/uploads', express.static(uploadsDir));

console.log(`Serving static files from: ${uploadsDir}`);

// serve public folder for apidoc
app.use(express.static('public'));

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;
