import express from "express";
import { errorHandler } from "./middleware/error.middleware";
import { initializeRoutes } from "./routes";

const app = express();
app.use(express.json());

initializeRoutes(app);

app.use(errorHandler);

export default app;
