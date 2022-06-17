import crypto from 'crypto';
import {CookieOptions, Request} from 'express';
import {
    createUser,
    findUser,
    updateUser
} from '../services/user.service';



const cookiesOptions: CookieOptions ={
    httpOnly: true,
    sameSite: 'lax'
}

if(process.env.NODE_ENV == "production") cookiesOptions.secure = true;



