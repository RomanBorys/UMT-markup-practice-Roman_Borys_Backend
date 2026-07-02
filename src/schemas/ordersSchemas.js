import Joi from "joi";

const phonePattern =
  /^[+0-9()\-. ]{7,30}$/;

export const createOrderSchema =
  Joi.object({
    bouquetId: Joi.number()
      .integer()
      .positive()
      .strict()
      .required(),

    customerName: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required(),

    phone: Joi.string()
      .trim()
      .pattern(phonePattern)
      .required()
      .messages({
        "string.pattern.base":
          "phone has an invalid format",
      }),

    address: Joi.string()
      .trim()
      .max(255)
      .allow("")
      .optional(),

    message: Joi.string()
      .trim()
      .max(1000)
      .allow("")
      .optional(),

    quantity: Joi.number()
      .integer()
      .min(1)
      .max(99)
      .strict()
      .required(),
  })
    .required()
    .unknown(false);