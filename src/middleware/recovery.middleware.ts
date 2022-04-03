import AppError from "../errors/AppError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyRecoveryToken = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  jwt.verify(
    token as string,
    process.env.SECRET as string,
    async (err: any, decoded: any) => {
      if (err) {
        throw new AppError("Invalid or expired token", 401);
      }

      const email = decoded.email;
      const id = decoded.id;

      req.user = { email, id };

      next();
    }
  );
};
