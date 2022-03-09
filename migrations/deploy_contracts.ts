type Network = "development" | "kovan" | "rinkeby" | "mainnet";

module.exports = (artifacts: Truffle.Artifacts, web3: Web3) => {
  return async (
    deployer: Truffle.Deployer,
    network: Network,
    accounts: string[]
  ) => {
    const NFT = artifacts.require("SimpleCollectible");

    await deployer.deploy(NFT, "first_parameter", "second_parameter");
    const nft = await NFT.deployed();
    console.log(`Metacoin deployed at ${nft.address} in network: ${network}.`);
  };
};
