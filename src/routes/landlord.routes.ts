import express from 'express';
import {
   postLandlordHandler,
   getLandlordHandler
} from '../controllers/landlord.controller';
import { validate } from '../middleware/validate';
import {LandLordInput} from '../schemas/landlord.schema';

const router = express.Router();

router.post('/createhouse',  validate(LandLordInput), postLandlordHandler);
router.get('/landlord', getLandlordHandler);

export default router;

