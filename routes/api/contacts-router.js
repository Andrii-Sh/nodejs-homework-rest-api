import express from "express";
import {
  contactsGetController,
  contactsGetByIdController,
  contactsPostController,
  contactsDeleteController,
  contactsPutController,
} from "../../controllers/contacts-controller.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsGetController);

contactsRouter.get("/:id", contactsGetByIdController);

contactsRouter.post("/", contactsPostController);

contactsRouter.delete("/:id", contactsDeleteController);

contactsRouter.put("/:id", contactsPutController);

export default contactsRouter;
