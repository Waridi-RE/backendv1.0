import UserServices from "../services/userServices";
import {Request, Response} from 'express';
import { IUser } from "../interfaces/User";
import jwt from 'jsonwebtoken';
import Joi from "joi";

class AuthController {
    public async signUp(req: Request, res: Response ): Promise<Response> {

        const {body} = req;

        //Validator Schema
        const validator = Joi.object<IUser>({
            username: Joi.string().trim().max(500),
            password: Joi.string().trim().max(500),
            email: Joi.string().trim().max(500).email,
            role: Joi.string().trim().max(50).valid('admin', 'landlord', 'tenant', 'user')
        });

        //Body validate
        const {value, error} = validator.validate(body, {
            presence: 'required',
            abortEarly: false, 
        });

        if(error) {
            return res.status(422).json({
                errors: error.details.map(err => err.message)
            });
        }

        const newUserResult = await UserServices.createNewUser
    }
}