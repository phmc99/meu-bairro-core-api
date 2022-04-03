import { Router } from "express";
import { signIn } from "../controllers/user.controller";

const router = Router();

export const loginRouter = () => {
  router.post("", signIn);
  return router;
};
