import { Router } from "express";

import { addOrder } from "../controllers/ordersController.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createOrderSchema } from "../schemas/ordersSchemas.js";

const ordersRouter = Router();

ordersRouter.post(
  "/",
  validateBody(createOrderSchema),
  ctrlWrapper(addOrder),
);

export default ordersRouter;