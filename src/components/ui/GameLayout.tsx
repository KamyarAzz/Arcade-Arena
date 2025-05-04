import {ReactNode} from "react";
import Return from "./Return";
import GameOverModal from "./GameOverModal";

type Props = {
  children: ReactNode;
  title: string;
  gameOver?: boolean;
  onReset?: () => void;
  score?: number;
  highscore?: number;
};

export default function GameLayout({
  children,
  title,
  gameOver,
  onReset,
  score,
  highscore,
}: Props) {
  return (
    <div className="w-full h-full">
      {gameOver && (
        <GameOverModal
          onReset={onReset}
          score={score || 0}
          highscore={highscore || 0}
        />
      )}
      <div className="relative flex items-center justify-center w-full">
        <Return />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <div className="flex flex-col items-center justify-center w-full p-4 mt-16 h-max">
        {children}
      </div>
    </div>
  );
}
