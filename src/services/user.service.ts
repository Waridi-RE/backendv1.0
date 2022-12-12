
import { omit, get } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import userModel, { User } from '../models/auth.model';
import { excludedFields } from '../controllers/auth.controller';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Find All users
export const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select('+password');
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  // Sign the access token
  const access_token = signJwt(
    { sub: user._id },
    {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    }
  );

  // Create a Session
  redisClient.set(user._id, JSON.stringify(user), {
    EX: 60 * 60,
  });

  // Return access token
  return { access_token };
};
// import {PrismaClient, Prisma, User} from "@prisma/client";
// import {Request, Response} from "express";
// import redisClient from "../utils/connectRedis";
// import config from 'config';
// import { signJwt } from "../utils/jwt";
// const prisma = new PrismaClient();

// export const createUser = async(input:  Prisma.UserCreateInput) => {
//     return (await prisma.user.create({
//         data: input,
//     })) as User;
//  };

//  export const findUser = async (
//       where: Partial<Prisma.UserCreateInput>,
//       select?: Prisma.UserSelect
//       ) => {
//     return(
//         await prisma.user.findFirst({
//             where,
//             select
//         }) as User
//     )
//  }

//  export const updateUser = async (
//      where: Partial<Prisma.UserWhereUniqueInput>,
//      data: Prisma.UserUpdateInput,
//      select?: Prisma.UserSelect
//  ) => {
//      return(
//         await prisma.user.update({where, data, select}) as User
//      )
//  }

//  export const findUniqueUser = async (
//      req: Request,
//      where: Prisma.UserWhereUniqueInput,
//      select?: Prisma.UserSelect

//  ) => {
//        return( await prisma.user.findUnique(
       
//            {
//                where: {email: req.body.email},
//                select
//            }
//        )) as User;
//  }


//  export const signTokens = async(user: Prisma.UserCreateInput) => {
//       //1. Create Session
//       redisClient.set(`${user}`, JSON.stringify(user), {
//           EX: config.get<number>('redisCacheExpiresIn') * 60
//       });

//       //Create Access and Refresh Tokens
//     const access_token = signJwt({sub: user}, 'accessTokenPrivateKey',{
//      expiresIn: `${config.get('accessTokenExpiresIn')}m`, });

//     const refresh_token = signJwt({sub: user}, 'refreshTokenPrivateKey', {
//         expiresIn: `${config.get('refreshTokenExpiresIn')}m`
//     }); 

//     return {access_token, refresh_token};
//  }

