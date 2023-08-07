import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";
import {
  isEmptyBody,
  isValidId,
  isEmptyFavoriteBody,
  authenticate,
} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.add
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyFavoriteBody,
  validateBody(contactsSchemas.contactsUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
