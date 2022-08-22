import { LandLordInput } from "../schemas/landlord.schema";
import { Response, NextFunction, Request } from "express";
import {
    createLandlord,
    getLandlord
} from "../services/landlord.service";

import {Prisma} from "@prisma/client";

export const postLandlordHandler = async (
    req: Request<{}, {}, LandLordInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const landlord = await createLandlord({
            first_name: req.body.first_name,
            other_names: req.body.other_names,
            house_name: req.body.house_name,
            description: req.body.description,
            location: req.body.location,
        })
       return res.status(200).json({
          data: {
            landlord
          }
       }      
       ) 
    } catch (err: any) {
        if(err instanceof Prisma.PrismaClientUnknownRequestError){
            return res.status(500).json({message: "Error In Posting Data"})
        }
    }
}


export const getLandlordHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
    ) => {
        try {
            const landlord = await getLandlord({});
            return res.status(200).json({
                data: {
                    landlord
                }
            })
        } catch (err: any) {
            next(err);
        }
       
}
