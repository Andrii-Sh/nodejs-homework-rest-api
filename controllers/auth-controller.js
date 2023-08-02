import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  } else {
    throw HttpError(400, "<Помилка від Joi або іншої бібліотеки валідації>");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
