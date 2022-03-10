type Network = "development" | "kovan" | "rinkeby" | "mainnet";

module.exports = (artifacts: Truffle.Artifacts, web3: Web3) => {
  return async (
    deployer: Truffle.Deployer,
    network: Network,
    accounts: string[]
  ) => {
    const Aether = artifacts.require("Aether");

    await deployer.deploy(
      Aether,
      "https://our-server-api/metadata",
      "https://contract-uri"
    );
    const nft = await Aether.deployed();
    console.log(`Metacoin deployed at ${nft.address} in network: ${network}.`);
  };
};
