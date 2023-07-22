import express from "express";
import moviesController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";
import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", moviesController.getAll);

contactsRouter.get("/:id", moviesController.getById);

contactsRouter.post(
  "/",
  validateBody(contactsSchemas.contactsAddSchema),
  moviesController.add
);

contactsRouter.delete("/:id", moviesController.deleteById);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  moviesController.updateById
);

export default contactsRouter;
