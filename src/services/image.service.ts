import path from "path/posix";
import { cloudUpload } from "./cloudinary.service";
import fs from "fs";

export const imageUpload = async (cnpj: string) => {
  let result: any = {};
  const images: any = {};

  const imagesFolder = path.resolve(__dirname, "..", "tmp", "uploads");
  fs.readdirSync(imagesFolder).forEach((file) => {
    const fileSplit = file.split("-");
    if (fileSplit[0].includes(cnpj)) {
      images[fileSplit[1]] = file;
    }
  });

  if (images.avatar) {
    result.avatar = await cloudUpload(imagesFolder + "/" + images.avatar);
  }
  if (images.image1) {
    result.image1 = await cloudUpload(imagesFolder + "/" + images.image1);
  }
  if (images.image2) {
    result.image2 = await cloudUpload(imagesFolder + "/" + images.image2);
  }
  if (images.image3) {
    result.image3 = await cloudUpload(imagesFolder + "/" + images.image3);
  }
  if (images.image4) {
    result.image4 = await cloudUpload(imagesFolder + "/" + images.image4);
  }
  if (images.image5) {
    result.image5 = await cloudUpload(imagesFolder + "/" + images.image5);
  }

  return result;
};
