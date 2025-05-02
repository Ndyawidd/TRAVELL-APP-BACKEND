import Joi from "joi";

const userUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  username: Joi.string().min(3).max(30),
  password: Joi.string().min(6),
  role: Joi.string().valid("ADMIN", "USER"),
  image: Joi.string().allow(""),
  balance: Joi.number().min(0).default(0),
});

export { userUpdateSchema };
