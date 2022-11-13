import UserServices from "../services/userServices";
import {Request, Response} from 'express';
import { IUser } from "../interfaces/User";
import jwt from 'jsonwebtoken';
import Joi from "joi";
import userServices from "../services/userServices";

class AuthController {
    public async signUp(req: Request, res: Response ): Promise<Response> {

        const {body} = req;

        //Validator Schema
        const validator = Joi.object<IUser>({
            username: Joi.string().trim().max(500),
            password: Joi.string().trim().max(500),
            email: Joi.string().trim().max(500).email(),
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

        const newUserResult = await UserServices.createNewUser(value);

        if(newUserResult instanceof Error) {
            return res.status(newUserResult.httpCode).json({
                errors: [newUserResult.message]
            });
        }
        return res.status(201).json(newUserResult);
    }

    public async signIn(req: Request, res: Response) {
        const { body } = req;

        //Validator Schema
        const validator = Joi.object<Pick<IUser, 'password' | 'email'>> ({
            password: Joi.string().trim().max(200),
            email: Joi.string().trim().max(100).email()
        });

        //Body Validate
        const { value, error } = validator.validate(body, {
            presence: 'required',
            abortEarly: false
        });

        if(error) {
            return res.status(422).json({
                errors: error.details.map(err => err.message)
            });
        }

        const userResult = await userServices.getUserByEmailAndPassword(
            value.email,
            value.password
        );
        if(userResult instanceof Error) {
            return res.status(userResult.httpCode).json({
                errors: [userResult.message]
            });
        }

        const jwtToken = jwt.sign({id: userResult.id}, process.env.API_TOKEN, {
            expiresIn: '24h'
        });
        return res.status(200).json({
            user: userResult,
            token: jwtToken
        });
    }
}

export default new AuthController;
