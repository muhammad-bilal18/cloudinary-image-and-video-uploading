import { File } from '../models/file';

import express from 'express';
const router = express.Router();

router.get('/', async(req, res) => {
    let files = []
    files = await File.find({});

    res.status(200).json({ files });
})

export default router;