import Joi from "joi";

export const destinationCreateSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  location: Joi.string().min(3).max(255).required(),
  category: Joi.string().valid("Nature", "City", "Historical", "Beach", "Other").required(),
  description: Joi.string().max(500).required(),
});

export const destinationUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  location: Joi.string().min(3).max(255),
  category: Joi.string().valid("Nature", "City", "Historical", "Beach", "Other"),
  description: Joi.string().max(500),
});
