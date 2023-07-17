import contactsServise from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import contactsAddSchema from "../validators/contacts-validator.js";

export const contactsGetController = async (req, res, next) => {
  try {
    const result = await contactsServise.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const contactsGetByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServise.getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const contactsPostController = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsServise.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const contactsDeleteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServise.removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

export const contactsPutController = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await contactsServise.updateContactById(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
