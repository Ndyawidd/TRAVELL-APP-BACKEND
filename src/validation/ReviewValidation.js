import Joi from "joi";

const reviewCreateSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  destinationId: Joi.number().integer().positive().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().min(3).max(500).required(),
});

const reviewUpdateSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  comment: Joi.string().min(3).max(500),
});

export { reviewCreateSchema, reviewUpdateSchema };
