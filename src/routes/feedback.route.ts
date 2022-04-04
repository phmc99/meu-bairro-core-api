import { Router } from "express";
import { create, destroy } from "../controllers/feedback.controller";
import {
  isAdmAuthenticated,
  isAuthenticated,
} from "../middleware/authentication.middleware";

const router = Router();

export const feedbackRouter = () => {
  router.post("", isAuthenticated, create);
  router.delete("/:id", isAdmAuthenticated, destroy);

  return router;
};
