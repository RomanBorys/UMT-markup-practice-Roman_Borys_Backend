import { HttpError } from "../helpers/HttpError.js";

export function validateIdParam(req, _res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    next(HttpError(400, "Invalid bouquet id"));
    return;
  }

  req.bouquetId = id;
  next();
}