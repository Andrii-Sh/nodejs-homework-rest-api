import fs from "fs/promises";
import path, { join } from "path";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const url = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    avatarURL: url,
    password: hashPassword,
  });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: `Subscription was updated successfully. New subscription is ${result.subscription}`,
  });
};

const avatarPath = path.resolve("public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  const avatarURL = path.join("avatars", filename);

  try {
    const avatar = await Jimp.read(oldPath);
    await avatar.resize(256, 256).quality(60).writeAsync(oldPath);
  } catch (error) {
    console.log(error);
  }

  await fs.rename(oldPath, newPath);

  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    { new: true }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    avatarURL,
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
};
