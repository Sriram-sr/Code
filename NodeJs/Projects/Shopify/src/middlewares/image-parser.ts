import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const imageStorage = multer.diskStorage({
  destination(_, _1, cb) {
    cb(null, 'src/uploads');
  },
  filename(_, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  }
});

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({
  storage: imageStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});
