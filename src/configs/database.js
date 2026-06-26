import { Sequelize } from "sequelize";

import { env } from "./env.js";

const dialectOptions = env.databaseSsl
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  : {};

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  define: {
    timestamps: false,
  },
});

export async function connectDatabase() {
  if (!env.databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
  }

  await sequelize.authenticate();
  await sequelize.sync();

  console.log("Database connection successful");
}