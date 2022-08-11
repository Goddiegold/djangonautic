const cloudinary = require("cloudinary").v2;
const config = require("config");
const {unlink} = require('fs');


cloudinary.config({
  cloud_name: config.get("cloudinary_name"),
  api_key: config.get("cloudinary_api_key"),
  api_secret: config.get("cloudinary_api_secret"),
  secure: true,
}); 


exports.uploadFile = (file) => {
  return new Promise((resolve,reject) => {
    cloudinary.uploader.upload( 
      file,
      { resource_type: "auto", folder:`djangonautic-react/` },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error)
        }
      },
      
    );
  });
};

exports.deleteFile = async (file) =>{  
  await unlink(`public/uploads/${file}`, function (err) {
    if(err) console.log(err)
    else console.log(`${file} deleted!`)
      });
}