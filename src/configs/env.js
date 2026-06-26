import "dotenv/config";

function parseBoolean(value, fallback = false) {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim().toLowerCase() === "true";
}

const parsedPort = Number.parseInt(process.env.PORT ?? "", 10);

const frontendUrls = (process.env.FRONTEND_URLS ?? "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

export const env = Object.freeze({
  port:
    Number.isInteger(parsedPort) && parsedPort > 0
      ? parsedPort
      : 3000,

  nodeEnv: process.env.NODE_ENV ?? "development",

  frontendUrls,

  databaseUrl: process.env.DATABASE_URL?.trim() ?? "",

  databaseSsl: parseBoolean(process.env.DATABASE_SSL),
});