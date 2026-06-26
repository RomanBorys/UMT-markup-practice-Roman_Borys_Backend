import { readFileSync } from "node:fs";

const openapiFileUrl = new URL(
  "../docs/openapi.json",
  import.meta.url,
);

function loadOpenapiDocument() {
  const documentContent = readFileSync(
    openapiFileUrl,
    "utf8",
  );

  return JSON.parse(documentContent);
}

export const openapiDocument =
  loadOpenapiDocument();

export const swaggerUiOptions = {
  customSiteTitle: "Flora API Documentation",

  swaggerOptions: {
    displayRequestDuration: true,
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 2,
  },
};