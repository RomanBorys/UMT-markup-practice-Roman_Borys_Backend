import { DataTypes } from "sequelize";

import { sequelize } from "../configs/database.js";

export const Bouquet = sequelize.define(
  "Bouquet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
        max: 99_999_999.99,
      },

      get() {
        const value = this.getDataValue("price");
        return value === null ? null : Number(value);
      },
    },

   photoURL: {
  type: DataTypes.STRING(2048),
  allowNull: false,

  validate: {
    isHttpUrl(value) {
      let parsedUrl;

      try {
        parsedUrl = new URL(value);
      } catch {
        throw new Error("photoURL must be a valid URL");
      }

      const allowedProtocols = new Set([
        "http:",
        "https:",
      ]);

      if (!allowedProtocols.has(parsedUrl.protocol)) {
        throw new Error(
          "photoURL must use HTTP or HTTPS",
        );
      }
    },
  },
},

    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "bouquets",
    timestamps: false,
  },
);