import { randomUUID } from "node:crypto";
import { rename, rm } from "node:fs/promises";
import path from "node:path";

import { photosDirectory } from "../configs/storage.js";
import { HttpError } from "./HttpError.js";

const extensionsByMimeType = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

export async function moveUploadedPhoto(file) {
  const extension = extensionsByMimeType.get(
    file.mimetype,
  );

  if (!extension) {
    throw HttpError(
      400,
      "Unsupported photo format",
    );
  }

  const fileName =
    `${randomUUID()}${extension}`;

  const destinationPath = path.join(
    photosDirectory,
    fileName,
  );

  await rename(file.path, destinationPath);

  return {
    fileName,
    destinationPath,
  };
}

export async function removeFile(filePath) {
  if (!filePath) {
    return;
  }

  await rm(filePath, {
    force: true,
  });
}
