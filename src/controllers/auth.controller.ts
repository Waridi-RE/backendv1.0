import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import config from 'config';
import {CookieOptions, NextFunction, Request, Response} from 'express';
import {
    createUser,
    findUser,
    updateUser
} from '../services/user.service';
import AppError from '../utils/appError';

import { RegisterUserInput, VerifyEmailInput } from '../schemas/user.schema';
import Email from '../utils/email';
import { Prisma } from '@prisma/client';

const cookiesOptions: CookieOptions ={
    httpOnly: true,
    sameSite: 'lax'
}

if(process.env.NODE_ENV == "production") cookiesOptions.secure = true;


const accessTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,

}


export const registerUserHandler = async(
  req: Request<{}, {}, RegisterUserInput>,
  res: Response,
  next: NextFunction
   
) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const verifyCode = crypto.randomBytes(32).toString('hex');

      const verificationCode = crypto
      .createHash('sha256')
      .update(verifyCode)
      .digest('hex');

      const user = await createUser({
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password: hashedPassword,
          verificationCode,
      });

      const redirectUrl = `${config.get<string>(
              'origin'
      )}/verifyemail/${verifyCode}`;
      try{
          await new Email(user, redirectUrl).sendVerificationCode();
          await updateUser({id: user.id}, {verificationCode});

          res.status(201).json({
              status: 'success',
              message: 'Email with a verification code has been sent to your email',
          });
      } catch(error){
          await updateUser({id: user.id}, {verificationCode: null});
          return res.status(500).json({
              status: 'error',
              message: 'There was an error sending email, please try again',
          });

      }

  } catch (err: any) {
      if(err instanceof Prisma.PrismaClientKnownRequestError){
          if(err.code === 'P2002'){
              return res.status(409).json({
                  status: 'fail',
                  message: 'Email already exist, please use another email address',
              });
          }
      }
      next(err);
  }
};

export const verifyEmailHandler = async(
    req: Request<VerifyEmailInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const verificationCode = crypto
        .createHash('sha256')
        .update(req.params.verificationCode)
        .digest('hex');

        const user = await updateUser(
            {verificationCode},
            {verified: true, verificationCode: null},
            {email: true}
        );

        if(!user){
            return next(new AppError(401, 'Could not verify email'));
        }

        res.status(200).json({
            status: 'success',
            message: 'Email verified successfully',
          });

    } catch (err: any) {
        if (err.code === 'P2025') {
            return res.status(403).json({
              status: 'fail',
              message: `Verification code is invalid or user doesn't exist`,
            });
          }
          next(err);
        }   
    }
