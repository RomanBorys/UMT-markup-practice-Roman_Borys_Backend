import { env } from "./env.js";

export const corsOptions = {
  origin(origin, callback) {
    const requestHasNoOrigin = !origin;
    const originListIsEmpty = env.frontendUrls.length === 0;
    const originIsAllowed = env.frontendUrls.includes(origin);

    if (requestHasNoOrigin || originListIsEmpty || originIsAllowed) {
      callback(null, true);
      return;
    }

    const error = new Error("Not allowed by CORS");
    error.status = 403;

    callback(error);
  },
};