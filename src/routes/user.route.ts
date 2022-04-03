import { Router } from "express";
import {
  create,
  generateToken,
  getAll,
  getOne,
  passwordRecovery,
  updateAdm,
  updateCommerceOwner,
  updateProfileImage,
} from "../controllers/user.controller";
import { userSchema } from "../entities/schemas/user.validation.model";
import { validate } from "../middleware/validation.middleware";
import {
  isAdmAuthenticated,
  isAuthenticated,
  isRecurseOwner,
} from "../middleware/authentication.middleware";
import multerService from "../services/multer.service";
import multer from "multer";
import { verifyRecoveryToken } from "../middleware/recovery.middleware";

const router = Router();

export const userRouter = () => {
  router.post("", validate(userSchema), create);
  router.get("/:id", isAuthenticated, getOne);
  router.get("", isAuthenticated, getAll);
  router.patch("/adm/:id", isAdmAuthenticated, updateAdm);
  router.patch("/owner/:id", isAdmAuthenticated, updateCommerceOwner);
  router.patch(
    "/photo/:id",
    isAuthenticated,
    isRecurseOwner,
    multer(multerService).single("avatarUrl"),
    updateProfileImage
  );
  router.post("/password/recovery", generateToken);
  router.post("/password/change", verifyRecoveryToken, passwordRecovery);
  return router;
};
