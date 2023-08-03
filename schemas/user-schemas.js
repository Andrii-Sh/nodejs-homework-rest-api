import Joi from "joi";
import { emailRegexp } from "../constatnts/user-constants.js";

const userSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `<Помилка від Joi або іншої бібліотеки валідації>`,
    "string.pattern.base": `<Помилка від Joi або іншої бібліотеки валідації>`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `<Помилка від Joi або іншої бібліотеки валідації>`,
    "string.min": `<Помилка від Joi або іншої бібліотеки валідації>`,
  }),
});

export default {
  userSignUpSchema,
};
