'use strict'

import {Request, Response, NextFunction} from 'express';
import Market from '../schemas/market.schema';
import cloudinary from '../utils/cloudinary';

export const marketRegisterController =async (req: Request, res: Response, next: NextFunction) => {
   try {
    const result = await cloudinary.v2.uploader.upload(req.file?.path!);
    const newMarket = new Market({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        marketImageUrl: result.url,
        public_id: result.public_id
    });

    const savedMarket = await newMarket.save();
    res.status(201).json(savedMarket);
   } catch (error: any) {
    res.status(400).send(error.message)
   }
}

export const getMarketController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const market = await Market.find();
        return res.status(200).json(market);
    } catch (error: any) {
        res.status(400).send(error.message);
  }
}

