import express, { Router } from 'express';
import multer from '../utils/fileHelper';
import { marketRegisterController, getMarketController } from '../controllers/market.controller';

const router = express.Router();

router.post('/postmarket', marketRegisterController);
router.get('/getmarket', getMarketController);

export default router;