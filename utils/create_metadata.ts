export default function createMetaData(tokenId: number) {
  const metadataFileName = "";
  return metadataFileName;
}

interface MetaData {
  image: string;
  name: string;
  description?: string;
  external_url?: string;
  attributes: Attribute[];
}

interface Attribute {
  trait_type: string;
  value: string;
}
