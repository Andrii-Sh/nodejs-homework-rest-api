import { HttpError } from "../helpers/index.js";

const isEmptyFavoriteBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }
  next();
};

export default isEmptyFavoriteBody;
