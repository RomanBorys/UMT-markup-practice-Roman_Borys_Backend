import { HttpError } from "../helpers/HttpError.js";

export function validateBody(schema) {
  return function validateRequestBody(req, _res, next) {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
      convert: true,
    });

    if (error) {
      const message = error.details
        .map((detail) => detail.message.replaceAll('"', ""))
        .join("; ");

      next(HttpError(400, message));
      return;
    }

    req.body = value;
    next();
  };
}