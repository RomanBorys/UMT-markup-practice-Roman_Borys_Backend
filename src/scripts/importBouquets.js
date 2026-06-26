import { readFile } from "node:fs/promises";

import {
  connectDatabase,
  sequelize,
} from "../configs/database.js";
import { Bouquet } from "../models/Bouquet.js";

const sourceFileUrl = new URL(
  "../../data/flowers.json",
  import.meta.url,
);

function normalizeBouquet(item) {
  const title =
    typeof item?.title === "string"
      ? item.title.trim()
      : "";

  const description =
    typeof item?.desc === "string"
      ? item.desc.trim()
      : "";

  const photoURL =
    typeof item?.img === "string"
      ? item.img.trim()
      : "";

  const price = Number(item?.price);

  const isValid =
    title !== "" &&
    description !== "" &&
    photoURL !== "" &&
    Number.isFinite(price) &&
    price >= 0;

  if (!isValid) {
    return null;
  }

  return {
    title,
    description,
    price,
    photoURL,
    favorite: item.category === "top",
  };
}

async function readBouquetsFile() {
  const fileContent = await readFile(
    sourceFileUrl,
    "utf8",
  );

  const parsedData = JSON.parse(fileContent);

  if (!Array.isArray(parsedData)) {
    throw new Error(
      "flowers.json must contain an array",
    );
  }

  return parsedData;
}

async function importBouquets() {
  const resetEnabled =
    process.argv.includes("--reset");

  if (!resetEnabled) {
    throw new Error(
      'Reset confirmation is required. Run the script with "--reset".',
    );
  }

  await connectDatabase();

  const sourceItems =
    await readBouquetsFile();

  const bouquets = sourceItems
    .map(normalizeBouquet)
    .filter(Boolean);

  const skippedCount =
    sourceItems.length - bouquets.length;

  if (bouquets.length === 0) {
    throw new Error(
      "No valid bouquets were found",
    );
  }

  await sequelize.transaction(
    async (transaction) => {
      await Bouquet.truncate({
        restartIdentity: true,
        cascade: true,
        transaction,
      });

      await Bouquet.bulkCreate(
        bouquets,
        {
          validate: true,
          transaction,
        },
      );
    },
  );

  console.log(
    `Imported ${bouquets.length} bouquets`,
  );

  console.log(
    `Skipped ${skippedCount} invalid ${
      skippedCount === 1
        ? "record"
        : "records"
    }`,
  );
}

try {
  await importBouquets();
} catch (error) {
  console.error(
    "Bouquet import failed:",
    error.message,
  );

  process.exitCode = 1;
} finally {
  await sequelize.close().catch(() => {});
}