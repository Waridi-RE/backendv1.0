import express from 'express';
import multer from 'multer';
import uploadImage from '../utils/uploadImage';
import imgResponse from '../utils/imgResponse';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

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
router.post('/upload-profile', upload.single('profile-file'), async(req, res, next) => {
   const localFilePath = req.file?.path;
   const result = await uploadImage(localFilePath);
   const response = imgResponse([result])

   return res.send(response);
   
})

// router.post('/upload-multiple', upload.array('profile-files', 12),  async(req, res, next) => {
//     //req.files is array of 'profile-files' files
//     //req.body will contain the text fields, if there were any

//     var imageUrlList = []
//     for(var i=0; i < req.files!.length; i++){
//       var locaFilePath = req.files[i].path
//       var result = await uploadImage(locaFilePath);
//       imageUrlList.push(result)
//     }

//     var response = imgResponse(imgResponse)
//     return res.send(response)
// })

export default router;