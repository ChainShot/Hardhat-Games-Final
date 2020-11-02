const hre = require("hardhat");

const GAME_ADDRESS = "0x";

async function main() {
  const Game = await hre.ethers.getContractFactory("Game3");
  const game = await Game.attach(GAME_ADDRESS);

  game.on('Winner', (addr) => {
    console.log(addr + ' won!');
  });
}

main();
