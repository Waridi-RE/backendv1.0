import express from 'express';
import {singleFileUpload , getAllFiles} from '../controllers/image.controller';
import multer from '../utils/fileHelper';
const router = express();


router.post('/upload',multer.single("file"), singleFileUpload);
router.get('/getfile', getAllFiles);

export default router;