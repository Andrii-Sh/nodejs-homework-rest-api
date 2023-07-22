import contactsServise from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import contactsAddSchema from "../validators/contacts-validator.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res, next) => {
  const result = await contactsServise.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsServise.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsServise.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsServise.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
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
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
