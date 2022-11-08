import express from 'express';
const router = express.Router();

import Permission from '../middlewares/Permissions';
import authController from '../controllers/authController';

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

export default router;
