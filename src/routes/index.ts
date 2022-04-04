import { Express } from "express";
import { categoryRouter } from "./category.route";
import { commerceRouter } from "./commerce.route";
import { feedbackRouter } from "./feedback.route";
import { loginRouter } from "./login.route";
import { userRouter } from "./user.route";

export const initializeRoutes = (app: Express) => {
  app.use("/commerce", commerceRouter());
  app.use("/category", categoryRouter());
  app.use("/user", userRouter());
  app.use("/login", loginRouter());
  app.use("/feedback", feedbackRouter());
};
