import express from "express";
import moviesController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", moviesController.getAll);

contactsRouter.get("/:id", isValidId, moviesController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  moviesController.add
);

// contactsRouter.delete("/:id", isValidId, moviesController.deleteById);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  moviesController.updateById
);

export default contactsRouter;
