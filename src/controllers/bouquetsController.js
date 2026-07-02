import { HttpError } from "../helpers/HttpError.js";
import {
  moveUploadedPhoto,
  removeFile,
} from "../helpers/photoStorage.js";
import {
  createBouquet,
  deleteBouquetById,
  findAllBouquets,
  findBouquetById,
  updateBouquetById,
  updateBouquetFavoriteById,
  updateBouquetPhotoById,
} from "../services/bouquetsService.js";

function createPublicPhotoURL(req, fileName) {
  const serverOrigin =
    `${req.protocol}://${req.get("host")}`;

  return new URL(
    `/photos/${fileName}`,
    serverOrigin,
  ).toString();
}

export async function getBouquets(req, res) {
  const favoriteQuery =
    req.query.favorite;

  let favorite;

  if (favoriteQuery !== undefined) {
    if (
      favoriteQuery !== "true" &&
      favoriteQuery !== "false"
    ) {
      throw HttpError(
        400,
        "favorite must be true or false",
      );
    }

    favorite =
      favoriteQuery === "true";
  }

  const bouquets =
    await findAllBouquets({
      favorite,
    });

  res.status(200).json(bouquets);
}

export async function getBouquetById(req, res) {
  const bouquet = await findBouquetById(
    req.bouquetId,
  );

  if (!bouquet) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(bouquet);
}

export async function addBouquet(req, res) {
  const bouquet = await createBouquet(req.body);

  res.status(201).json(bouquet);
}

export async function updateBouquet(req, res) {
  const bouquet = await updateBouquetById(
    req.bouquetId,
    req.body,
  );

  if (!bouquet) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(bouquet);
}

export async function removeBouquet(req, res) {
  const wasDeleted = await deleteBouquetById(
    req.bouquetId,
  );

  if (!wasDeleted) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "Bouquet deleted",
  });
}

export async function updateBouquetFavorite(
  req,
  res,
) {
  const bouquet =
    await updateBouquetFavoriteById(
      req.bouquetId,
      req.body.favorite,
    );

  if (!bouquet) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(bouquet);
}

export async function updateBouquetPhoto(
  req,
  res,
) {
  if (!req.file) {
    throw HttpError(
      400,
      "Photo file is required",
    );
  }

  let savedPhoto = null;

  try {
    const existingBouquet =
      await findBouquetById(req.bouquetId);

    if (!existingBouquet) {
      throw HttpError(404, "Not found");
    }

    savedPhoto = await moveUploadedPhoto(
      req.file,
    );

    const photoURL = createPublicPhotoURL(
      req,
      savedPhoto.fileName,
    );

    const updatedBouquet =
      await updateBouquetPhotoById(
        req.bouquetId,
        photoURL,
      );

    if (!updatedBouquet) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({
      photoURL: updatedBouquet.photoURL,
    });
  } catch (error) {
    if (savedPhoto?.destinationPath) {
      await removeFile(
        savedPhoto.destinationPath,
      ).catch(() => {});
    }

    throw error;
  } finally {
    await removeFile(req.file.path).catch(
      () => {},
    );
  }
}