import { Router } from "express";

import {
  addBouquet,
  getBouquetById,
  getBouquets,
  removeBouquet,
  updateBouquet,
  updateBouquetFavorite,
  updateBouquetPhoto,
} from "../controllers/bouquetsController.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { uploadBouquetPhoto } from "../middlewares/uploadBouquetPhoto.js";
import { validateBody } from "../middlewares/validateBody.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";
import {
  createBouquetSchema,
  updateBouquetSchema,
  updateFavoriteSchema,
} from "../schemas/bouquetsSchemas.js";

const bouquetsRouter = Router();

bouquetsRouter.get(
  "/",
  ctrlWrapper(getBouquets),
);

bouquetsRouter.get(
  "/:id",
  validateIdParam,
  ctrlWrapper(getBouquetById),
);

bouquetsRouter.post(
  "/",
  validateBody(createBouquetSchema),
  ctrlWrapper(addBouquet),
);

bouquetsRouter.put(
  "/:id",
  validateIdParam,
  validateBody(updateBouquetSchema),
  ctrlWrapper(updateBouquet),
);

bouquetsRouter.delete(
  "/:id",
  validateIdParam,
  ctrlWrapper(removeBouquet),
);

bouquetsRouter.patch(
  "/:id/favorite",
  validateIdParam,
  validateBody(updateFavoriteSchema),
  ctrlWrapper(updateBouquetFavorite),
);

bouquetsRouter.patch(
  "/:id/photo",
  validateIdParam,
  uploadBouquetPhoto,
  ctrlWrapper(updateBouquetPhoto),
);

export default bouquetsRouter;