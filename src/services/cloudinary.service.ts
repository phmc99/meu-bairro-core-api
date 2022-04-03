import cloudinary from "cloudinary";
import AppError from "../errors/AppError";

export const cloudUpload = async (image: any) => {
  let result: any;
  await cloudinary.v2.uploader.upload(image, (err: any, res: any) => {
    if (err) {
      throw new AppError("Image upload failed", 400);
    }
    result = res;
  });
  return result.url;
};
