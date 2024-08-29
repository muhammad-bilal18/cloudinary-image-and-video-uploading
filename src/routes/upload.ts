import { File } from '../models/file';
import { upload } from '../middlewares/multer';
import { cloudinary } from '../utils/cloudinary';

import express from 'express';
const router = express.Router();

const cloud = cloudinary();


router.post('/', upload.single('file'), async (req, res) => {

    const file: any = req.file;
    let type = file.mimetype.split('/')[0];

    let uploadPreset;

    uploadPreset = (type.includes('image')) ? 'images_preset' : 'videos_preset';
    
    const result = await cloud.uploader.upload(file.path, {
        upload_preset: uploadPreset,
        resource_type: type
    });
        
    const fileUrl = result.secure_url;

    const newFile = new File({
        fileName: file.filename,
        fileSize: file.size,
        fileType: type,
        fileURL: fileUrl
    })

    const respond = await newFile.save();
    if(respond) return res.status(200).send({ message: 'File added successfully' });
    else return res.status(500).send({ message: 'Internal db error' });
});

export default router;