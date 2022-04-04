import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { updateAddress } from "../services/address.service";
import {
  create,
  listAllCommerces,
  listOneCommerce,
} from "../services/commerce.service";

export const createCommerce = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const commerce = await create(req.body, user);
    res.status(201).send(commerce);
  } catch (error) {
    next(error);
  }
};

export const updateCommerceAdress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const adressUpdate = await updateAddress(id, data);
    res.status(201).send(adressUpdate);
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
    const user = await listOneCommerce(id);
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
    const page = Number(req.query.page)
    const users = await listAllCommerces(page);
    res.json(users);
  } catch (error) {
    next(error);
  }
};
