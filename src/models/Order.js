import { DataTypes } from "sequelize";

import { sequelize } from "../configs/database.js";

export const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    bouquetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "bouquets",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    customerName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 30],
      },
    },

    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 99,
      },
    },

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 99_999_999.99,
      },

      get() {
        const value =
          this.getDataValue("totalPrice");

        return value === null
          ? null
          : Number(value);
      },
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  },
);