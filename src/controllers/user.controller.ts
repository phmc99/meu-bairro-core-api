import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities";
import AppError from "../errors/AppError";
import { mailTemplateOptions, transport } from "../services/email.service";
import {
  admPermission,
  changePassword,
  commerceOwnerPermission,
  createUser,
  generateRecoveryToken,
  listAllUsers,
  listOneUser,
  login,
  updateAvatarUrl,
} from "../services/user.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser({ ...req.body });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await listOneUser(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateAdm = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await admPermission(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return res.json({ message: `user ${user.email} isAdm: ${user.isAdm}` });
  } catch (error) {
    next(error);
  }
};

export const updateCommerceOwner = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await commerceOwnerPermission(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return res.json({
      message: `user ${user.email} hasCommerce: ${user.hasCommerce}`,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfileImage = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await updateAvatarUrl(id);

    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const generateToken = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const token = await generateRecoveryToken(email);

    const options = mailTemplateOptions(
      email,
      "Recuperação de senha",
      "recovery",
      {
        token,
      }
    );

    transport.sendMail(options, function (err, info) {
      if (err) {
        return next(err);
      } else {
        console.log("Message sent:", info.response);
      }
    });

    res.json({ message: `the token was sent to ${email}` });
  } catch (error) {
    next(error);
  }
};

export const passwordRecovery = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.user;
    const change = await changePassword(email, req.body.password);
    res.json(change);
  } catch (error) {
    next(error);
  }
};
