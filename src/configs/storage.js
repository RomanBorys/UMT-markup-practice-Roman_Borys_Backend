import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(
  fileURLToPath(import.meta.url),
);

const projectRoot = path.resolve(
  currentDirectory,
  "../..",
);

export const tempDirectory = path.join(
  projectRoot,
  "temp",
);

export const publicDirectory = path.join(
  projectRoot,
  "public",
);

export const photosDirectory = path.join(
  publicDirectory,
  "photos",
);

export async function ensureStorageDirectories() {
  await Promise.all([
    mkdir(tempDirectory, { recursive: true }),
    mkdir(photosDirectory, { recursive: true }),
  ]);
}