import { randomUUID } from "node:crypto";

import multer from "multer";

import { tempDirectory } from "../configs/storage.js";
import { HttpError } from "../helpers/HttpError.js";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, tempDirectory);
  },

  filename(_req, _file, callback) {
    const temporaryName =
      `${randomUUID()}.tmp`;

    callback(null, temporaryName);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: MAX_PHOTO_SIZE,
    files: 1,
  },

  fileFilter(_req, file, callback) {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(
        HttpError(
          400,
          "Only JPEG, PNG, and WebP images are allowed",
        ),
      );
      return;
    }

    callback(null, true);
  },
});

export function uploadBouquetPhoto(
  req,
  res,
  next,
) {
  const uploadSinglePhoto =
    upload.single("photo");

  uploadSinglePhoto(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        next(
          HttpError(
            400,
            "Photo file is too large. Maximum size is 5 MB",
          ),
        );
        return;
      }

      if (
        error.code === "LIMIT_UNEXPECTED_FILE"
      ) {
        next(
          HttpError(
            400,
            'Unexpected file field. Use "photo"',
          ),
        );
        return;
      }

      next(HttpError(400, error.message));
      return;
    }

    if (Number.isInteger(error.status)) {
      next(error);
      return;
    }

    next(
      HttpError(
        400,
        error.message || "Invalid photo file",
      ),
    );
  });
}