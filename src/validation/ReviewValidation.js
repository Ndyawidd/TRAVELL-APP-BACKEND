import Joi from "joi";

const reviewCreateSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  ticketId: Joi.number().integer().positive().required(),
  orderId: Joi.string().required(), // Changed to string to match Prisma schema
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().min(3).max(500).required(),
  image: Joi.string().allow("").optional(), // Allow Base64 string or empty
});

const reviewUpdateSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().min(3).max(500).optional(),
  image: Joi.string().allow("").optional(),
});

export { reviewCreateSchema, reviewUpdateSchema };
