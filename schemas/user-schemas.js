import Joi from "joi";
import { emailRegexp } from "../constatnts/user-constants.js";

const userSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required email field`,
    "string.pattern.base": `email field doesn't match the required pattern. Please, check the email field.`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
    "string.min": `password length must be at least 6 characters long`,
  }),
});

export default {
  userSignUpSchema,
};
