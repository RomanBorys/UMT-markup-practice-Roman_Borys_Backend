import { randomUUID } from "node:crypto";

import gravatar from "gravatar";

export function generateBouquetPhotoURL() {
  const identifier =
    `bouquet-${randomUUID()}@flora.local`;

  return gravatar.url(
    identifier,
    {
      s: "600",
      d: "identicon",
      f: "y",
      r: "pg",
    },
    true,
  );
}