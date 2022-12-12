import { expressjwt } from "express-jwt";
import { Response, NextFunction } from "express";
import { UserGetDefinition } from "./definitionFile";
import User from '../schemas/user.schema';

function jwt(roles = []) {
     if(typeof roles === "string"){
      roles = [roles];
      console.log(roles);  
     } 

     const secret: any = process.env.ACCESS_TOKEN_SECRET;

     return [
        expressjwt({secret, algorithms: ["HS256"] }),

        async (req: UserGetDefinition, res: Response, next: NextFunction) => {
            const user = await User.findById(req.user.sub);


         if(!user || (roles.length && !roles.includes(user.role))) {
            return res.status(401).json({ message: "UnAuthorized!" });
         }

         req.user.roles = user.role;
         next();
         }

     ]
 
}
