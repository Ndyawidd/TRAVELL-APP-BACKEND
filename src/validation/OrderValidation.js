import Joi from "joi";

export const orderCreateSchema = Joi.object({
  userId: Joi.number().integer().required(),
  ticketId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  totalPrice: Joi.number().precision(2).required(),
  paymentStatus: Joi.string()
    .valid("PENDING", "PAID", "CANCELLED")
    .default("PENDING"),
});

export const orderUpdateSchema = Joi.object({
  quantity: Joi.number().integer().min(1),
  totalPrice: Joi.number().precision(2),
  paymentStatus: Joi.string().valid("PENDING", "PAID", "CANCELLED"),
});
