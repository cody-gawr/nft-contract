const fs = require("fs");
const pinataSDK = require("@pinata/sdk");
require("dotenv").config({
  path: "../.env",
});
const pinata = pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);
const pinataGatewayBaseUrl = "https://gateway.pinata.cloud/ipfs/";
const uploadImageToPinata = (): string => {
  return "";
};

module.exports = uploadImageToPinata;
