import express from 'express';
import multer from 'multer';
import fs from  'fs';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '/home/james/Documents/waridi/backend/uploads')
    }, 

    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})


const upload = multer({
    storage: storage
})
router.post('/uploadprofile', upload.single('profilefile'), async(req, res, next) => {
   
   console.log('file', req.file);
   console.log('body', req.body);

   res.status(200).json({
    message: 'Success!'
   })
})


export default router;