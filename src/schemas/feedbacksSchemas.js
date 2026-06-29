import Joi from "joi";

const authorSchema = Joi.string()
  .trim()
  .min(2)
  .max(100);

const textSchema = Joi.string()
  .trim()
  .min(5)
  .max(1000);

export const createFeedbackSchema = Joi.object({
  author: authorSchema.required(),
  text: textSchema.required(),
})
  .required()
  .unknown(false);