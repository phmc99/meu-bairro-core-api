import { Router } from "express";
import {
  create,
  destroy,
  listAll,
  update,
} from "../controllers/category.controller";
import { isAdmAuthenticated } from "../middleware/authentication.middleware";

const router = Router();

export const categoryRouter = () => {
  router.use(isAdmAuthenticated);
  router.post("", create);
  router.get("", listAll);
  router.patch("/:id", update);
  router.delete("/:id", destroy);

  return router;
};
