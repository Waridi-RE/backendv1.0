import express from 'express';
import {
    registerUserHandler,
    verifyEmailHandler,
} from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { 
     registerUserSchema,
     
    } from '../schemas/user.schema';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUserHandler);

// router.get(
//     '/verifyemail/:verificationCode',
//     validate(verifyEmailSchema),
//     verifyEmailHandler
// );

export default router;