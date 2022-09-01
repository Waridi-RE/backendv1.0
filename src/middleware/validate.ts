import { Request, Response, NextFunction } from "express";
import { AnyZodObject, Schema, ZodError } from "zod";
export const validate = 
(schema: AnyZodObject) => 
(req: Request, res: Response, next: NextFunction) => {
    try {
      schema.default({
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          errors: error.errors,
        });
      }
      next(error);
    }
  };