import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { corsOptions } from "./configs/corsOptions.js";
import {
  openapiDocument,
  swaggerUiOptions,
} from "./configs/swagger.js";
import { publicDirectory } from "./configs/storage.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import bouquetsRouter from "./routes/bouquetsRouter.js";
import feedbacksRouter from "./routes/feedbacksRouter.js";
import ordersRouter from "./routes/ordersRouter.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(cors(corsOptions));
app.use(express.json({ limit: "100kb" }));

app.use(express.static(publicDirectory));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    openapiDocument,
    swaggerUiOptions,
  ),
);

app.use("/api/bouquets", bouquetsRouter);
app.use("/api/feedbacks", feedbacksRouter);
app.use("/api/orders", ordersRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;