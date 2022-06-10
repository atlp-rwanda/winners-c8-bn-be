import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images Only!', null);
};
export const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter,
});
