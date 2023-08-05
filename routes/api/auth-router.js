import express from "express";
import { validateBody } from "../../decorators/index.js";
import userSchemas from "../../schemas/user-schemas.js";
import authController from "../../controllers/auth-controller.js";
import { authenticate } from "../../middlewares/index.js";

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

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/:id/subscription",
  authenticate,
  authController.updateUserSubscription
);

export default authRouter;
