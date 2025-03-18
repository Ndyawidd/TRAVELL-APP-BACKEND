import Joi from "joi";

export const ticketCreateSchema = Joi.object({
  destinationId: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
  capacity: Joi.number().integer().positive().required(),
  available: Joi.number().integer().min(0).required(),
  schedule: Joi.date().iso().required(),
});

export const ticketUpdateSchema = Joi.object({
  destinationId: Joi.number().integer().positive(),
  price: Joi.number().positive(),
  capacity: Joi.number().integer().positive(),
  available: Joi.number().integer().min(0),
  schedule: Joi.date().iso(),
});
