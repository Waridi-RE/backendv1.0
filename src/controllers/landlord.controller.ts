import { LandLordInput } from "../schemas/landlord.schema";
import { Response, NextFunction, Request } from "express";
import {
    createLandlord
} from "../services/landlord.service";

import {Prisma} from "@prisma/client";

export const postLandlordHandler = async (
    req: Request<{}, {}, LandLordInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const landlord = createLandlord({
            first_name: req.body.first_name,
            other_names: req.body.other_names,
            house_name: req.body.house_name,
            national_id: req.body.id,
            nationality: req.body.nationality,
            description: req.body.description,
            location: req.body.location

        }) 
    } catch (err: any) {
        if(err instanceof Prisma.PrismaClientUnknownRequestError){
            return res.status(500).json({message: "Error In Posting Data"})
        }
    }
}

