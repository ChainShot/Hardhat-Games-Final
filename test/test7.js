const { assert } = require("chai");

// This test needs block mining instead of hardhat automining
// Run it like this: npx hardhat --network ganache test
// 

describe("Game7", function () {
  let game;
  beforeEach(async () => {
    const Game = await hre.ethers.getContractFactory("Game7");
    game = await Game.deploy();
    await game.deployed();
  });

  describe('after guessing the wrong number', () => {
    beforeEach(async () => {
      try {
        await game.win(123);
      }
      catch (ex) {

      }
    });

    it("should not have logged a winner", async function () {
      const filter = game.filters.Winner();
      filter.fromBlock = 0;
      const logs = await ethers.provider.getLogs(filter);
      assert.equal(logs.length, 0);
    });
  });

  describe('after guessing the correct number', () => {
    const triesCount = 4;

    beforeEach(() => {
      let txPromises = [];
      for (let n = 0; n < triesCount; n++) {
        console.log(`calling with ${n}`);
        let p = game.win(n);
        txPromises.push(p);
      }
      return Promise.allSettled(txPromises)
        .then(txs => {
          let receiptPromises = txs.map(tx => {
            if (tx.status != 'rejected') {
              console.log(tx);
              return tx.value.wait();
            }
            else {
              console.log(`tx: ${tx.status} ${tx.reason}`);
              return null;
            }
          });
          return Promise.all(receiptPromises)
            .then(receipts => {
              console.log(`all done!`);
              console.log(receipts);
              // return done();
            })
            .catch(e => {
              console.log(`receipt error ${e}`)
            });
        })
        .catch(txError => {
          console.log(`tx error: ${txError}`)
        });

    });

    it("should have logged a winner", async function () {
      const filter = game.filters.Winner();
      filter.fromBlock = 0;
      const logs = await ethers.provider.getLogs(filter);
      assert.equal(logs.length, 1);
    });
  });
});
