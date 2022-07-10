import { PrismaClient, Prisma, User } from "@prisma/client";

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


export const findUserById = async () => {

}