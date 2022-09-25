import { Request } from "express";

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IDecodedToken {
    id?: string;
    user?: IUser;
    iat: number;
    exp: number;
}

