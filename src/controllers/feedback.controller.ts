import { NextFunction, Request, Response } from "express";
import { createFeedback, deleteFeedback } from "../services/feedback.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await createFeedback(req.body);

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await deleteFeedback(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
