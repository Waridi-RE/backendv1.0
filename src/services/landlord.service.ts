import { PrismaClient, Prisma, Landlord } from "@prisma/client";
import config from "config";
import redisClient from "../utils/connectRedis";
// import cloudinary from "../utils/cloudinary";
const prisma = new PrismaClient();


export const createLandlord = async (input: Prisma.LandlordCreateInput) => {

   return(
       await prisma.landlord.create({
           data: input
       })) as Landlord;
};

export const getLandlord = async() => {
    return(
         await prisma.landlord.findMany()
    ) as unknown as Landlord;
}


export const findUniqueLandlord = async (
    where: Prisma.UserWhereUniqueInput,
    select?:Prisma.UserSelect
) => {
        return(
            await prisma.user.findUnique({
                where,
                select
})
        ) as Landlord
} 

// export const signTokens = (user: Prisma.UserCreateInput) => {
//     //Create Session
//     redisClient.set(`${us}`, JSON.stringify(user),{
//         EX: config.get<number>('redisCacheExpiresIn') * 60
// //     })
// }