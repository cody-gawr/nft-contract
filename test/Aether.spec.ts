import { assert, expect } from "chai";
import { AetherInstance } from "../types/truffle-contracts";
const { expectRevert } = require("@openzeppelin/test-helpers");
const Aether = artifacts.require("Aether");

contract("Aether", async ([alice, bob, dev, minter]) => {
  let aether: AetherInstance;
  beforeEach(async () => {
    aether = await Aether.new(
      "http://localhost:4040/api/metadata",
      "https://contract_uri",
      { from: minter }
    );
    await aether.toggleSale({ from: minter });
  });

  it("mint", async () => {
    await aether.mint({
      from: alice,
      value: web3.utils.toBN(web3.utils.toWei("0.1", "ether")),
    });

    expect((await aether.totalSupply()).toNumber()).to.eq(1);
  });

  it("should not allow non-owner to do ownerMint", async () => {
    await expectRevert(
      aether.ownerMint(bob, {
        from: alice,
      }),
      "Ownable: caller is not the owner"
    );
  });

  it("renew a token", async () => {
    await aether.mint({
      from: alice,
      value: web3.utils.toBN(web3.utils.toWei("0.1", "ether")),
    });

    const tokenId = await aether.totalSupply();
    await aether.renewToken(tokenId, {
      from: alice,
      value: web3.utils.toBN(web3.utils.toWei("0.1", "ether")),
    });
  });

  it("should allow owner to set an expiration time", async () => {
    await aether.setExpirationTime(60, { from: minter });
    expect((await aether.expirationTime()).toNumber()).to.eq(60 * 3600 * 24);
  });
});
