import Joi from "joi";

const MAX_PRICE = 99_999_999.99;

const titleSchema = Joi.string()
  .trim()
  .min(1)
  .max(255);

const descriptionSchema = Joi.string()
  .trim()
  .min(1);

const priceSchema = Joi.number()
  .strict()
  .min(0)
  .max(MAX_PRICE)
  .precision(2);

const favoriteSchema = Joi.boolean()
  .strict();

export const createBouquetSchema = Joi.object({
  title: titleSchema.required(),
  description: descriptionSchema.required(),
  price: priceSchema.required(),
  favorite: favoriteSchema.optional(),
})
  .required()
  .unknown(false);

export const updateBouquetSchema = Joi.object({
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  price: priceSchema.optional(),
  favorite: favoriteSchema.optional(),
})
  .min(1)
  .required()
  .unknown(false);

export const updateFavoriteSchema = Joi.object({
  favorite: favoriteSchema.required(),
})
  .required()
  .unknown(false);