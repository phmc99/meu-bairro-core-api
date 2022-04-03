import { Router } from "express";
import multer from "multer";
import { updateCommerceAdress } from "../controllers/address.controller";
import {
  createCommerce,
  getAll,
  getOne,
} from "../controllers/commerce.controller";
import { updateCommerceContact } from "../controllers/contact.controller";
import { addressSchema } from "../entities/schemas/address.validation.model";
import {
  isAdmAuthenticated,
  isAuthenticated,
  isCommerceOwner,
} from "../middleware/authentication.middleware";
import { validate } from "../middleware/validation.middleware";
import multerService from "../services/multer.service";

const router = Router();

export const commerceRouter = () => {
  router.post(
    "",
    multer(multerService).any(),
    isAdmAuthenticated,
    createCommerce
  );
  router.patch(
    "/address/:id",
    validate(addressSchema),
    isAuthenticated,
    isCommerceOwner,
    updateCommerceAdress
  );
  router.patch(
    "/contact/:id",
    isAuthenticated,
    isCommerceOwner,
    updateCommerceContact
  );
  router.get("/:id", isAuthenticated, getOne);
  router.get("", isAuthenticated, getAll);

  return router;
};
