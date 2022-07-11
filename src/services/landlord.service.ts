import { PrismaClient, Prisma, User } from "@prisma/client";
import config from "config";
import redisClient from "../utils/connectRedis";

const prisma = new PrismaClient();


export const createLandlord = async (input: Prisma.UserCreateInput) => {
   return(
    await prisma.user.create({
        data: input
    })) as User;
};

export const getLandlord = async(
    where: Partial<Prisma.UserCreateInput>,
    select?: Prisma.UserSelect) => {
    return(
        await prisma.user.findFirst({
            where,
            select
        })
    ) as User
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
        ) as User
} 

export const signTokens = (user: Prisma.UserCreateInput) => {
    //Create Session
    redisClient.set(`${user.id}`, JSON.stringify(user),{
        EX: config.get<number>('redisCacheExpiresIn') * 60
    })
}