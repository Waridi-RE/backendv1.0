'use strict'
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
         cb(null, '/home/james/Documents/waridi/backend/upload')
    },

    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})



const filefilter = (req: any, file: any, cb: any) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
     || file.mimetype === 'image/jpeg'){
        cb(null, true);
     } else {
        cb(null, false);
     }
}

export const upload = multer({storage: storage, fileFilter:filefilter});
