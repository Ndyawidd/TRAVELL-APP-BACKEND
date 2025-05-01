import Joi from "joi";

export const orderCreateSchema = Joi.object({
  userId: Joi.number().integer().required(),
  ticketId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export const orderUpdateSchema = Joi.object({
  quantity: Joi.number().integer().min(1),
  status: Joi.string().valid("PENDING", "CONFIRMED", "CANCELLED"),
});
