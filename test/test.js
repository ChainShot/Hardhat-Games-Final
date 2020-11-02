const { assert } = require("chai");

describe("Game", function() {
  let game;
  beforeEach(async () => {
    const Game = await hre.ethers.getContractFactory("Game");
    game = await Game.deploy();

    await game.deployed();
  });

  describe('after winning twice', () => {
    beforeEach(async () => {
      await game.win();
      await game.win();
    });

    it("should have logged a winner", async function() {
      const filter = game.filters.Winner();
      filter.fromBlock = 0;
      const logs = await ethers.provider.getLogs(filter);
      assert.equal(logs.length, 2);
    });
  });
});
