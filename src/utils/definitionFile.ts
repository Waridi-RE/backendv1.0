import { Request } from "express";

export interface UserGetDefinition extends Request {
  user: string
};

