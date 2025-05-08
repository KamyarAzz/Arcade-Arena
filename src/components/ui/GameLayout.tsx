import {ReactNode} from "react";
import GameOverModal from "./GameOverModal";

type Props = {
  children: ReactNode;
  gameOver?: boolean;
  onReset?: () => void;
  score?: number;
  highscore?: number;
  status?: "lose" | "win";
  additionalText?: string;
};

export default function GameLayout({
  children,
  gameOver,
  onReset,
  score,
  highscore,
  status,
  additionalText,
}: Props) {
  return (
    <div className="w-full h-full">
      {gameOver && (
        <GameOverModal
          status={status}
          onReset={onReset}
          score={score}
          highscore={highscore}
          additionalText={additionalText}
        />
      )}
      <div className="flex flex-col items-center justify-center w-full p-4 mt-3 md:mt-16 h-max">
        {children}
      </div>
    </div>
  );
}
