import { Router } from "express";

import {
  addFeedback,
  getFeedbacks,
} from "../controllers/feedbacksController.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createFeedbackSchema } from "../schemas/feedbacksSchemas.js";

const feedbacksRouter = Router();

feedbacksRouter.get(
  "/",
  ctrlWrapper(getFeedbacks),
);

feedbacksRouter.post(
  "/",
  validateBody(createFeedbackSchema),
  ctrlWrapper(addFeedback),
);

export default feedbacksRouter;