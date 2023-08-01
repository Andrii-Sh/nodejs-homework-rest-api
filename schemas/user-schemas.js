import Joi from "joi";
import { emailRegexp } from "../constatnts/user-constants.js";

const userSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export default {
  userSignUpSchema,
};
