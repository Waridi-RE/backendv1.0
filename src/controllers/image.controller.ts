'use strict'

import { Request, Response } from "express";
import { NextFunction } from "express";
import Image from "../schemas/image.schema";
import cloudinary from "../utils/cloudinary";

export const singleFileUpload = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
       const result = await cloudinary.v2.uploader.upload(req.file?.path!);
       const newImage = new Image({
        imageURL: result.url,
        public_id: result.public_id
       });
       const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

export const getAllFiles = async (req: Request, res: Response) => {
   try {
    const files = await Image.find();
    return res.status(200).json(files);
  
   } catch (error: any) {
      res.status(400).send(error.message)
   } 
   
}

const fileSizeFormatter = (bytes : any, decimal: any) => {
    if(bytes===0){
      return '0 Bytes';
    }

    const dm = decimal || 0;
    const sizes = ['Bytes','KB', 'MB', 'GB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index];

}


