import express from "express";
import { validateBody } from "../../decorators/index.js";
import userSchemas from "../../schemas/user-schemas.js";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(userSchemas.userSignUpSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  validateBody(userSchemas.userSignUpSchema),
  authController.signin
);

export default authRouter;
