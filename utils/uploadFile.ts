import cloudinaryMain from "cloudinary";
import config from "config";
import { unlink } from 'fs';

const cloudinary = cloudinaryMain.v2

cloudinary.config({
  cloud_name: config.get("cloudinary_name"),
  api_key: config.get("cloudinary_api_key"),
  api_secret: config.get("cloudinary_api_secret"),
  secure: true,
});


export const uploadFile = (file: string) => {
  if (!file) return;
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "auto", folder: `djangonautic-react/` },
      (error: any, result: any) => {
        if (result) {
          resolve(result);
        } else {
          reject(error)
        }
      },

    );
  });
};

export const deleteFile = async (file: string) => {
  if (!file) return;
  await unlink(`public/uploads/${file}`, function (err: any) {
    if (err) console.log(err)
    else console.log(`${file} deleted!`)
  });
}