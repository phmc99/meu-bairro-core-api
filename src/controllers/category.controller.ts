import { NextFunction, Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "../services/category.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const listAll = async (req: Request, res: Response) => {
  const users = await listCategories();

  res.send(users);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser = await updateCategory(id, req.body);

  res.send(updatedUser);
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await deleteCategory(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
