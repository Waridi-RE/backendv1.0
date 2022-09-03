import express from 'express';
import {
   postLandlordHandler,
   getLandlordHandler
} from '../controllers/landlord.controller';
import { createValidator } from 'express-joi-validation';
import { validate } from '../middleware/validate';
import {LandLordInput} from '../schemas/landlord.schema';
// import multer from '../utils/fileHelper';
const router = express.Router();
const joiMiddleware = createValidator();

router.post('/createhouse',postLandlordHandler);
router.get('/landlord', getLandlordHandler);

export default router;

