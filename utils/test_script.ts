const uploadImageToPinata = require("./upload_image_to_pinata");

const testFunc = async () => {
  const pinataImgUrl = await uploadImageToPinata();
  console.log(`Uploaded ${pinataImgUrl}`);
};

module.exports = testFunc;
