import express from 'express';
import {
    loginUserHandler,
    // refreshAccessTokenHandler,
    activeAccount,
    registerUserHandler,
    verifyEmailHandler,
} from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { 
    loginUserSchema,
     registerUserSchema,
     
    } from '../schemas/user.schema';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUserHandler);
router.post('/active', activeAccount);
router.post('/login', validate(loginUserSchema), loginUserHandler);
// router.get('/refresh', refreshAccessTokenHandler)
// router.get(
//     '/verifyemail/:verificationCode',
//     validate(verifyEmailSchema),
//     verifyEmailHandler
// );

export default router;