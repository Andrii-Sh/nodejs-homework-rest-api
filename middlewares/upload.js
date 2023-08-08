import multer from "multer";
import path from "path";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const { originalname } = file;
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
});

const limits = {
  filesize: 1024 * 2024 * 2,
};

export default upload;
