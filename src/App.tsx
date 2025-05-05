import {Route, Routes} from "react-router";
import Home from "@/components/pages/Home";
import Minesweeper from "@/components/pages/Minesweeper";
import Snake from "@/components/pages/Snake";
import MemoryGame from "@/components/pages/MemoryGame";
import TicTacToe from "@/components/pages/TicTacToe";
import DinosaurGame from "@/components/pages/DinosaurGame";
import GuessTheWord from "@/components/pages/GuessTheWord";

function App() {
  return (
    <div className="flex flex-col gap-2 md:gap-4 bg-mainBg-100 mx-auto px-4 md:px-14 py-4 md:py-8 w-full max-w-[1165px] h-full text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/minesweeper" element={<Minesweeper />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/dinosaur-game" element={<DinosaurGame />} />
        <Route path="/guess-the-word" element={<GuessTheWord />} />
      </Routes>
    </div>
  );
}

export default App;
