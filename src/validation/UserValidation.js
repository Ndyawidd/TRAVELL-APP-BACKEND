import Joi from "joi";

const userCreateSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("ADMIN", "USER").required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  username: Joi.string().min(3).max(30),
  password: Joi.string().min(6),
  role: Joi.string().valid("ADMIN", "USER"),
});

export { userCreateSchema, userUpdateSchema };
