import { HttpError } from "../helpers/HttpError.js";
import { createOrder } from "../services/ordersService.js";

export async function addOrder(req, res) {
  const order = await createOrder(req.body);

  if (!order) {
    throw HttpError(
      404,
      "Bouquet not found",
    );
  }

  res.status(201).json(order);
}