const { assert } = require("chai");

describe("Game1", function() {
  let game;
  beforeEach(async () => {
    const Game = await hre.ethers.getContractFactory("Game1");
    game = await Game.deploy();

    await game.deployed();
  });

  describe('after passing in the incorrect number', () => {
    beforeEach(async () => {
      try {
        await game.win(55);
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

  describe('after passing in the correct number', () => {
    beforeEach(async () => {
      await game.win(66);
    });

    it("should have logged a winner", async function() {
      const filter = game.filters.Winner();
      filter.fromBlock = 0;
      const logs = await ethers.provider.getLogs(filter);
      assert.equal(logs.length, 1);
    });
  });
});
