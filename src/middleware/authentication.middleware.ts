import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Commerce, User } from "../entities";

export const isAdmAuthenticated = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  const userRepository = getRepository(User);

  if (token === undefined) {
    return res
      .status(401)
      .json({ status: "error", message: "Missing authorization headers" });
  }

  jwt.verify(
    token as string,
    process.env.SECRET as string,
    async (err: any, decoded: any) => {
      if (err) {
        return res
          .status(400)
          .json({ status: "error", message: "Invalid Token" });
      }

      const user = await userRepository.findOne(decoded.id);

      if (!user?.isAdm) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }

      req.user = user;
      next();
    }
  );
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token === undefined) {
    return res.status(401).json({ message: "Missing authorization headers" });
  }

  jwt.verify(
    token as string,
    process.env.SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      }
      const userId: string = decoded.id;

      req.user = { id: userId };

      next();
    }
  );
};

export const isRecurseOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenId = req.user.id;
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.id !== tokenId) {
    return res.status(401).json({ error: "User is not recurse owner" });
  }

  next();
};

export const isCommerceOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenId = req.user.id;
  const commerceRepository = getRepository(Commerce);

  const commerce = await commerceRepository.findOne(req.params.id);

  if (!commerce) {
    return res.status(404).json({ error: "Commerce not found" });
  }

  if (commerce.owner.id !== tokenId) {
    return res
      .status(401)
      .json({ error: "This user does not own this commerce" });
  }

  next();
};
