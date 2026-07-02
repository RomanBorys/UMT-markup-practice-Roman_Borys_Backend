import { generateBouquetPhotoURL } from "../helpers/generateBouquetPhotoURL.js";
import { Bouquet } from "../models/Bouquet.js";

const CREATE_FIELDS = [
  "title",
  "description",
  "price",
  "favorite",
];

const UPDATE_FIELDS = [
  "title",
  "description",
  "price",
  "favorite",
];

function pickFields(source, allowedFields) {
  return allowedFields.reduce((result, field) => {
    if (Object.hasOwn(source, field)) {
      result[field] = source[field];
    }

    return result;
  }, {});
}

export async function findAllBouquets({
  favorite,
} = {}) {
  const options = {
    order: [["id", "ASC"]],
  };

  if (typeof favorite === "boolean") {
    options.where = {
      favorite,
    };
  }

  return Bouquet.findAll(options);
}

export async function findBouquetById(id) {
  return Bouquet.findByPk(id);
}

export async function createBouquet(payload) {
  const bouquetData = pickFields(
    payload,
    CREATE_FIELDS,
  );

  bouquetData.photoURL =
    generateBouquetPhotoURL();

  return Bouquet.create(bouquetData);
}

export async function updateBouquetById(
  id,
  payload,
) {
  const bouquet = await Bouquet.findByPk(id);

  if (!bouquet) {
    return null;
  }

  const bouquetData = pickFields(
    payload,
    UPDATE_FIELDS,
  );

  await bouquet.update(bouquetData);

  return bouquet;
}

export async function deleteBouquetById(id) {
  const bouquet = await Bouquet.findByPk(id);

  if (!bouquet) {
    return false;
  }

  await bouquet.destroy();

  return true;
}

export async function updateBouquetFavoriteById(
  id,
  favorite,
) {
  const bouquet = await Bouquet.findByPk(id);

  if (!bouquet) {
    return null;
  }

  await bouquet.update({ favorite });

  return bouquet;
}

export async function updateBouquetPhotoById(
  id,
  photoURL,
) {
  const bouquet = await Bouquet.findByPk(id);

  if (!bouquet) {
    return null;
  }

  await bouquet.update({ photoURL });

  return bouquet;
}