import Joi from "joi";

const wishlistCreateSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  ticketId: Joi.number().integer().positive().required(),
});

const wishlistUpdateSchema = Joi.object({
  userId: Joi.number().integer().positive(),
  ticketId: Joi.number().integer().positive(),
});

export { wishlistCreateSchema, wishlistUpdateSchema };
