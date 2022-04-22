import express from "express";
import { errorHandler } from "./middleware/error.middleware";
import { initializeRoutes } from "./routes";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

initializeRoutes(app);

app.use(errorHandler);

export default app;
