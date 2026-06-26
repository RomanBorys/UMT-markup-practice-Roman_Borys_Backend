import app from "./src/app.js";
import { connectDatabase } from "./src/configs/database.js";
import { env } from "./src/configs/env.js";
import { ensureStorageDirectories } from "./src/configs/storage.js";

import "./src/models/Bouquet.js";

async function startServer() {
  try {
    await ensureStorageDirectories();
    await connectDatabase();

    const server = app.listen(
      env.port,
      "0.0.0.0",
    );

    server.on("error", (error) => {
      console.error(
        "Server startup failed:",
        error.message,
      );

      process.exit(1);
    });
  } catch (error) {
    console.error(
      "Database connection failed:",
      error.message,
    );

    process.exit(1);
  }
}

startServer();