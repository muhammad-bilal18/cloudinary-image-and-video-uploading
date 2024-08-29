import express from 'express';
import cors from 'cors';

import upload from '../routes/upload';
import resourses from '../routes/resourses';

import { exception } from '../middlewares/exception';

export function createServer() {

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/resourses', resourses);
    app.use('/api/upload', upload);

    app.use(exception);

    return app;
}