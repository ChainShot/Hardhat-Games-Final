const { assert } = require("chai");
const number = 1912831;

describe("Game3", function() {
  let game;
  beforeEach(async () => {
    const Game = await hre.ethers.getContractFactory("Game3");
    game = await Game.deploy(number);

    await game.deployed();
  });

  describe('after guessing the wrong number', () => {
    beforeEach(async () => {
      try {
        await game.win(123);
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

  describe('after guessing the correct number', () => {
    beforeEach(async () => {
      await game.win(number);
    });

    it("should have logged a winner", async function() {
      const filter = game.filters.Winner();
      filter.fromBlock = 0;
      const logs = await ethers.provider.getLogs(filter);
      assert.equal(logs.length, 1);
    });
  });
});
