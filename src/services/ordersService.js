import { Bouquet } from "../models/Bouquet.js";
import { Order } from "../models/Order.js";

function normalizeOptionalText(value) {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  return normalizedValue === ""
    ? null
    : normalizedValue;
}

export async function createOrder(payload) {
  const bouquet = await Bouquet.findByPk(
    payload.bouquetId,
  );

  if (!bouquet) {
    return null;
  }

  const totalPrice = Number(
    (
      bouquet.price * payload.quantity
    ).toFixed(2),
  );

  return Order.create({
    bouquetId: bouquet.id,
    customerName: payload.customerName,
    phone: payload.phone,
    address: normalizeOptionalText(
      payload.address,
    ),
    message: normalizeOptionalText(
      payload.message,
    ),
    quantity: payload.quantity,
    totalPrice,
  });
}