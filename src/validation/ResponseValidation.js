import Joi from "joi";

const adminResponseCreateSchema = Joi.object({
  reviewId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  response: Joi.string().min(5).max(1000).required(),
});

const adminResponseUpdateSchema = Joi.object({
  response: Joi.string().min(5).max(1000).required(),
});

export { adminResponseCreateSchema, adminResponseUpdateSchema };
