import fs from "fs";
import path from "path";
import pinataSDK from "@pinata/sdk";
import dotenv from "dotenv";
import { Random } from "random-js";
dotenv.config({
  path: "../.env",
});

async function uploadImageToPinata(): Promise<string> {
  const pinata = pinataSDK(
    process.env.PINATA_API_KEY!,
    process.env.PINATA_API_SECRET!
  );
  const random = new Random();
  const pinataGatewayBaseUrl = "https://gateway.pinata.cloud/ipfs/";
  const imageFiles = fs.readdirSync(
    path.resolve(__dirname, "./metadata/local")
  );
  if (imageFiles.length > 0) {
    const randomIdx = random.integer(0, imageFiles.length - 1);
    const imageName = imageFiles[randomIdx];
    try {
      const { IpfsHash } = await pinata.pinFileToIPFS(
        fs.createReadStream(
          path.resolve(__dirname, `./metadata/local/${imageName}`)
        )
      );

      return `${pinataGatewayBaseUrl}${IpfsHash}`;
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error("Metadata folder has no images.");
  }
}

module.exports = uploadImageToPinata;
