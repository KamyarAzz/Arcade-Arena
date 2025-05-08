import {Route, Routes} from "react-router";
import Home from "@/components/pages/Home";
import DinosaurGame from "@/components/pages/DinosaurGame";
import GuessTheWord from "@/components/pages/wordle/GuessTheWord";
import MinesweeperSettings from "./components/pages/minesweeper/MinesweeperSettings";
import SnakeSettings from "./components/pages/snake/SnakeSettings";
import MemoryGameSettings from "./components/pages/memory/MemoryGameSettings";
import TicTacToeSettings from "./components/pages/tic-tac-toe/TicTacToeSettings";

function App() {
  return (
    <div className="flex flex-col gap-2 md:gap-4 bg-mainBg-100 mx-auto px-4 md:px-14 py-4 md:py-8 w-full max-w-[1165px] h-full text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/minesweeper" element={<MinesweeperSettings />} />
        <Route path="/snake" element={<SnakeSettings />} />
        <Route path="/memory-game" element={<MemoryGameSettings />} />
        <Route path="/tic-tac-toe" element={<TicTacToeSettings />} />
        <Route path="/dinosaur-game" element={<DinosaurGame />} />
        <Route path="/guess-the-word" element={<GuessTheWord />} />
      </Routes>
    </div>
  );
}

export default App;
