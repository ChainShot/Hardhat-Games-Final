const GAME_ADDRESS = "0x";

async function main() {
  const Game = await hre.ethers.getContractFactory("Game3");
  const game = await Game.attach(GAME_ADDRESS);

  const tx = await game.win();
  const receipt = await tx.wait();

  console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
