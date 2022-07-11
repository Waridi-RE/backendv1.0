import { LandLordInput } from "../schemas/about.schema";
import { Response, NextFunction, Request } from "express";
import {
    createUser
} from "../services/user.service"

export const postLandlordHandler = async (
    req: Request<{}, {}, LandLordInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const landlord = createUser({
            
        }) 
    } catch (error) {
        
    }
}