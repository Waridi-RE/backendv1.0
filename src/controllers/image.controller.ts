'use strict'

import { Request, Response } from "express";
import { NextFunction } from "express";

import imageSchema from "../schemas/image.schema";
export const singleFileUpload = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const file = new imageSchema({
          fileName: req.file?.originalname,
          filePath: req.file?.path,
          fileType: req.file?.mimetype,
          fileSize: fileSizeFormatter(req.file?.size, 2)
        })
        await file.save();
        console.log("File Uploaded Successfully");
        res.status(201).send("File Uploaded Successfully");
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

export const getAllFiles = async (req: Request, res: Response) => {
   try {
    const files = await imageSchema.find();
    return res.status(200).send(files);

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


