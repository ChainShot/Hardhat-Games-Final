const { assert } = require("chai");

describe("Game2", function() {
  let game;
  beforeEach(async () => {
    const Game = await hre.ethers.getContractFactory("Game2");
    game = await Game.deploy();

    await game.deployed();
  });

  describe('after paying too much', () => {
    beforeEach(async () => {
      try {
        await game.win({ value: ethers.utils.parseUnits("3", "gwei") });
      }
      catch(ex) {

      }
    });

    it("should not have logged a winner", async function() {
      const filter = game.filters.Winner();
      filter.fromBlock = 0;
      const logs = await ethers.provider.getLogs(filter);
      assert.equal(logs.length, 0);
    });
  });

  describe('after paying twice', () => {
    beforeEach(async () => {
      await game.win({ value: ethers.utils.parseUnits("1", "gwei") });
      await game.win({ value: ethers.utils.parseUnits("1", "gwei") });
    });

    it("should not have logged a winner", async function() {
      const filter = game.filters.Winner();
      filter.fromBlock = 0;
      const logs = await ethers.provider.getLogs(filter);
      assert.equal(logs.length, 0);
    });
  });

  describe('after paying three times', () => {
    beforeEach(async () => {
      await game.win({ value: ethers.utils.parseUnits("1", "gwei") });
      await game.win({ value: ethers.utils.parseUnits("1", "gwei") });
      await game.win({ value: ethers.utils.parseUnits("1", "gwei") });
    });

    it("should have logged a winner", async function() {
      const filter = game.filters.Winner();
      filter.fromBlock = 0;
      const logs = await ethers.provider.getLogs(filter);
      assert.equal(logs.length, 1);
    });
  });
});
