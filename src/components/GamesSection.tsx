import GameWrapper from "@/components/GameWrapper";
import snakeImage from "@/assets/snake.png";
import minesweeperImage from "@/assets/minesweeper.png";
import memoryImage from "@/assets/memory.png";
import dinoImage from "@/assets/dino.png";
import tictacktoeImage from "@/assets/tictactoe.jpg";
import pacmanImage from "@/assets/pacman.png";
import guessImage from "@/assets/guess.png";

export default function GamesSection() {
  // const retrievedData = localStorage.getItem("gameData");
  // const gameData = retrievedData ? JSON.parse(retrievedData) : null;
  return (
    <div className="relative gap-6 bg-mainBg-100 p-5 md:p-10 rounded-md w-full">
      <h3 className="font-bold text-2xl">
        Most Recent <span className="text-theme-300">Right Now</span>
      </h3>
      <div className="flex flex-wrap justify-center gap-10 mt-8">
        <GameWrapper image={minesweeperImage} link="/minesweeper">
          Minesweeper
        </GameWrapper>
        <GameWrapper image={snakeImage} link="/snake">
          Snake
        </GameWrapper>
        <GameWrapper image={memoryImage} link="/memory-game">
          Memory Game
        </GameWrapper>
        <GameWrapper image={tictacktoeImage} link="/tic-tac-toe">
          Tic Tac Toe
        </GameWrapper>
        <GameWrapper image={dinoImage} link="/dinosaur-game">
          Dinosaur Game
        </GameWrapper>
        <GameWrapper image={pacmanImage} link="/pacman">
          Pacman
        </GameWrapper>
        <GameWrapper image={guessImage} link="/guess-the-word">
          Guess the Word
        </GameWrapper>
      </div>
    </div>
  );
}
