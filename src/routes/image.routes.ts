import express from 'express';
import {singleFileUpload , getAllFiles} from '../controllers/image.controller';
import { upload } from '../utils/fileHelper';
const router = express();



router.post('/upload', upload.single('file'), singleFileUpload);
router.get('/getfile', getAllFiles);

export default router;