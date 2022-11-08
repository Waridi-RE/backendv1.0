import { Request, Response, NextFunction } from "express";
import userServices from "../services/userServices";
import { IJWTPayload } from "../interfaces/Jwt";

function Permission(roles: string[]){

    const errorResponse = {
        errors: ['unauthorized']
    };

    //Middleware
    return(req: Request, res: Response, next: NextFunction) => {
        const bearerToken = req.headers.authorization;

        if(typeof(bearerToken) === 'string') {
                   const bearerTokenString = bearerToken.split('string');

        }
    }

}

export default Permission;
