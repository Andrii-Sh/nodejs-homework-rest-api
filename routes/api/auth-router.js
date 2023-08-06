import express from "express";
import { validateBody } from "../../decorators/index.js";
import userSchemas from "../../schemas/user-schemas.js";
import authController from "../../controllers/auth-controller.js";
import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchemas.userSignUpSchema),
  authController.signup
);

authRouter.post(
  "/login",
  validateBody(userSchemas.userSignUpSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.patch("/", authenticate, authController.updateUserSubscription);

export default authRouter;
