import multer from "multer";
import path from "path";
import crypto from "crypto";
import AppError from "../errors/AppError";

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "local";

const storageTypes: any = {
  local: multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
      cb(null, path.resolve(__dirname, "..", "tmp", "uploads"));
    },
    filename: (req: any, file: any, cb: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          cb(err);
        }

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
  production: multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
      cb(null, path.resolve(__dirname, "..", "tmp", "uploads"));
    },
    filename: (req: any, file: any, cb: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          cb(err);
        }

        if (req.body.cnpj) {
          file.key = `${req.body.cnpj}-${file.fieldname}-${file.originalname}`;
        }

        if (file.fieldname && file.fieldname === "avatarUrl") {
          file.key = `${req.user.id}_${file.fieldname}.${
            file.originalname.split(".")[1]
          }`;
        }

        cb(null, file.key);
      });
    },
  }),
};

export default {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes[NODE_ENV],
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = ["image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Invalid file format.", 400));
    }
  },
};
