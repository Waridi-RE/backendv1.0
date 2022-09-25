import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import config from 'config';
import {CookieOptions, NextFunction, Request, Response} from 'express';
import  Jwt  from 'jsonwebtoken';
import sendMail from '../conf/sendMail';
import {
    createUser,
    findUniqueUser,
    findUser,
    updateUser,
    signTokens
} from '../services/user.service';
import {genAccessToken, genActiveToken} from '../conf/genToken';
import {validateEmail} from '../middleware/valid';
import AppError from '../utils/appError';
import { IUser, IDecodedToken } from '../utils/types';
import { LoginUserInput, RegisterUserInput, VerifyEmailInput } from '../schemas/user.schema';
import Email from '../utils/email';
import { Prisma, PrismaClient } from '@prisma/client';
import redisClient from '../utils/connectRedis';
import { email } from 'envalid';
const prisma = new PrismaClient();

const tokenEnv = {
  active: process.env.ACTIVE_TOKEN_SECRET,
  refresh: process.env.REFRESH_TOKEN_SECRET,
  access: process.env.ACCESS_TOKEN_SECRET, 
};

const CLIENT_URL = process.env.BASE_URL;


const cookiesOptions: CookieOptions ={
    httpOnly: true,
    sameSite: 'lax'
}

if(process.env.NODE_ENV == "production") cookiesOptions.secure = true;


const accessTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000

};

const refreshTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date( 
        Date.now() + config.get<number> ('refreshTokenExpiresIn') * 60 * 1000,
    ),
    maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
};


export const registerUserHandler = async(
  req: Request,
  res: Response,
   
) => {
  try {
      const exististingUser = await  prisma.user.findUnique({
        where: {email: req.body.email},
      });

      if(exististingUser){
        return res.status(400).json({message: "This user already exists"});
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const verifyCode = crypto.randomBytes(32).toString('hex');

      const verificationCode = crypto
      .createHash('sha256')
      .update(verifyCode)
      .digest('hex');
      const {name, email, password} = req.body;
    
      const user: IUser = {
          name: name,
          email: email,
          password: password,
      };

      //It generates a token five minutes to activate account
      const activeToken = genActiveToken({user});
      const url = `${CLIENT_URL}/api/v1/auth/active/${activeToken}`;
      if(validateEmail(email)){
        sendMail(email, url, "Verify your email address");
        return res.json({
            message: "Success! Please check your email address",
            active_token: activeToken,
        });
      }
    //   const user = await createUser({
    //       name: req.body.name,
    //       email: req.body.email.toLowerCase(),
    //       password: hashedPassword,
          //verificationCode,
    //   });

    //   const redirectUrl = `${config.get<string>(
    //           'origin'
    //   )}/verifyemail/${verifyCode}`;
    //   try{
    //       await new Email(user, redirectUrl).sendVerificationCode();
    //       await updateUser({id: user.id}, {verificationCode});

    //       res.status(201).json({
    //           status: 'success',
    //           message: 'Email with a verification code has been sent to your email',
    //       });
    //   } catch(error){
    //       await updateUser({id: user.id}, {verificationCode: null});
    //       return res.status(500).json({
    //           status: 'error',
    //           message: 'There was an error sending email, please try again',
    //       });

    //   }
    return res.status(200).json({
        data: {
            user
        }
    })

  } catch (error: any) {
    res.status(500).json(error.message);
    //   if(err instanceof Prisma.PrismaClientKnownRequestError){
    //       if(err.code === 'P2002'){
    //           return res.status(409).json({
    //               status: 'fail',
    //               message: 'Email already exist, please use another email address',
    //           });
    //       }
    //   }
  }
};

export const activeAccount = async (req: Request, res: Response) => {
    try {
       const {active_token} = req.body;
       const decoded = <IDecodedToken>(
        Jwt.verify(active_token, `${tokenEnv.active}`)
       );
       const { user } = decoded;
       if(!user) return res.status(400).json({message: "Invalid Token"});
       await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
       });
      res.status(200).json({ message: "Account has been activated" });
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}

export const loginUserHandler = async (
    req: Request<{}, {},  LoginUserInput>,
    res: Response,
    next: NextFunction
) => {
   try {
       const {email, password} = req.body;
       const user = await prisma.user.findUnique({
           where: {email: req.body.email}
       })
       if(!user){
           return next(new AppError(400, 'Invalid email or password'));
       }

       //Check if user is verified
    //    if(!user.verified){
    //         return next(
    //             new AppError(
    //                  401,
    //                  'You are not verified, Please verify your email'
    //             )
    //         );
    //    }

       if(!user || !(await bcrypt.compare(password, user.password))){
           return next(new AppError(400, 'Invalid email or password'));
       }

       //Sign Tokens
       const {access_token} = await signTokens(user);
       res.cookie('access_token', access_token, accessTokenCookieOptions);
    //    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
       res.cookie('logged_in', true, {
           ...accessTokenCookieOptions,
           httpOnly: false,
       });
       res.status(200).json({
           status: 'success',
           access_token
       });
       
   } catch (err: any) {
       next(err);
   }
}; 

// export const refreshAccessTokenHandler = async(
//    req: Request,
//    res: Response,
//    next: NextFunction

// ) => {
//    try {
//        const refresh_token = req.cookies.refresh_token;
//        const message = 'Could not refresh access token';
//        if(!refresh_token){
//             return next(new AppError(403, message));
//        }
//        //Validate refresh token
//        const decoded = verifyJwt<{sub: string}>(
//          refresh_token,
//          'refreshTokenPublicKey'
//        );
//        if(!decoded){
//            return next(new AppError(403, message));
//        }

//        //Check if user has a valid session
//        const session = await redisClient.get(decoded.sub);
//        if(!session){
//            return next(new AppError(403, message));
//        }

//        //Check if user still exist
//        const user = await findUniqueUser({id: JSON.parse(session).id});
//        if(!user){
//            return next(new AppError(403, message));
//        }

//        //Sign new access token
//        const access_token = signJwt({sub: user.id}, 'accessTokenPrivateKey', {
//            expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//        });

//        //Add Cookies
//        res.cookie('access_token', access_token, accessTokenCookieOptions);
//        res.cookie('logged_in', true, {
//            ...accessTokenCookieOptions,
//            httpOnly: false
//        });

//        //Send Response
//        res.status(200).json({
//            status: 'success',
//            access_token
//        });
//    } catch (err: any) {
//        next(err);
//    }
// };

// export const verifyEmailHandler = async(
//     req: Request<VerifyEmailInput>,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const verificationCode = crypto
//         .createHash('sha256')
//         .update(req.params.verificationCode)
//         .digest('hex');

//         const user = await updateUser(
//             {verificationCode},
//             {verified: true, verificationCode: null},
//             {email: true}
//         );

//         if(!user){
//             return next(new AppError(401, 'Could not verify email'));
//         }

//         res.status(200).json({
//             status: 'success',
//             message: 'Email verified successfully',
//           });

//     } catch (err: any) {
//         if (err.code === 'P2025') {
//             return res.status(403).json({
//               status: 'fail',
//               message: `Verification code is invalid or user doesn't exist`,
//             });
//           }
//           next(err);
//         }   
//     }
