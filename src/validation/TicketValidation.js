import Joi from "joi";

export const ticketCreateSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  capacity: Joi.number().integer().positive().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().required(),
  location: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

export const ticketUpdateSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  capacity: Joi.number().integer().positive().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  location: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});
