import {PrismaClient, Prisma, User} from "@prisma/client";
import redisClient from "../utils/connectRedis";
import config from 'config';
import { signJwt } from "../utils/jwt";
const prisma = new PrismaClient();

export const createUser = async(input:  Prisma.UserCreateInput) => {
    return (await prisma.user.create({
        data: input,
    })) as User;
 };

 export const findUser = async (
      where: Partial<Prisma.UserCreateInput>,
      select?: Prisma.UserSelect
      ) => {
    return(
        await prisma.user.findFirst({
            where,
            select
        }) as User
    )
 }

 export const updateUser = async (
     where: Partial<Prisma.UserWhereUniqueInput>,
     data: Prisma.UserUpdateInput,
     select?: Prisma.UserSelect
 ) => {
     return(
        await prisma.user.update({where, data, select}) as User
     )
 }

 export const findUniqueUser = async (
     where: Prisma.UserWhereUniqueInput,
     select?: Prisma.UserSelect

 ) => {
       return( await prisma.user.findUnique(

       
           {
               where,
               select
           }
       )) as User;
 }

 export const signTokens = async(user: Prisma.UserCreateInput) => {
      //1. Create Session
      redisClient.set(`${user}`, JSON.stringify(user), {
          EX: config.get<number>('redisCacheExpiresIn') * 60
      });

      //Create Access and Refresh Tokens
    const access_token = signJwt({sub: user}, 'accessTokenPrivateKey',{
     expiresIn: `${config.get('accessTokenExpiresIn')}m`, });

    const refresh_token = signJwt({sub: user}, 'refreshTokenPrivateKey', {
        expiresIn: `${config.get('refreshTokenExpiresIn')}m`
    }); 

    return {access_token, refresh_token};
 }

