import express from "express";
import moviesController from "../../controllers/contacts-controller.js";

const contactsRouter = express.Router();

contactsRouter.get("/", moviesController.getAll);

contactsRouter.get("/:id", moviesController.getById);

contactsRouter.post("/", moviesController.add);

contactsRouter.delete("/:id", moviesController.deleteById);

contactsRouter.put("/:id", moviesController.updateById);

export default contactsRouter;
