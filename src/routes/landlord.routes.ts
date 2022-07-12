import express from 'express';
import {
   postLandlordHandler
} from '../controllers/landlord.controller';
import { validate } from '../middleware/validate';
import {LandLordInput} from '../schemas/landlord.schema';


const router = express.Router();

router.post('/createhouse',  validate(LandLordInput), postLandlordHandler);

export default router;

