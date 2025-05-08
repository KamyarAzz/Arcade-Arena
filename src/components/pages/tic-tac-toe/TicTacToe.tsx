import GameLayout from "@/components/ui/GameLayout";
import {useEffect, useState} from "react";
import TicTacToeSquare from "./TicTacToeSquare";

type Props = {
  options: {computerOpponent: number};
};

const winConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

export default function TicTacToe({options}: Props) {
  const [player1ClaimedSpots, setPlayer1ClaimedSpots] = useState<number[]>([]);
  const [player2ClaimedSpots, setPlayer2ClaimedSpots] = useState<number[]>([]);
  const [turn, setTurn] = useState<"Player 1" | "Player 2">("Player 1");
  const [gameOver, setGameOver] = useState<
    null | "Draw" | "Player 1" | "Player 2"
  >(null);

  const resetGame = () => {
    setPlayer1ClaimedSpots([]);
    setPlayer2ClaimedSpots([]);
    setTurn("Player 1");
    setGameOver(null);
  };

  const clickHandler = (spot: number) => {
    if (
      player1ClaimedSpots.includes(spot) ||
      player2ClaimedSpots.includes(spot) ||
      (options.computerOpponent && turn === "Player 2")
    ) {
      return;
    }
    if (turn === "Player 1") player1ClaimedSpots.push(spot);
    else if (turn === "Player 2") player2ClaimedSpots.push(spot);

    if (checkWinCondition(turn)) setGameOver(turn);
    else if (player1ClaimedSpots.length + player2ClaimedSpots.length === 9)
      setGameOver("Draw");
    else if (turn === "Player 1") setTurn("Player 2");
    else if (turn === "Player 2") setTurn("Player 1");
  };

  const checkWinCondition = (turn: "Player 1" | "Player 2") => {
    const hasWon = winConditions.some((condition) =>
      condition.every((move) =>
        turn === "Player 1"
          ? player1ClaimedSpots.includes(move)
          : player2ClaimedSpots.includes(move)
      )
    );
    return hasWon;
  };

  useEffect(() => {
    if (options.computerOpponent && turn === "Player 2") {
      let newSpot = null;

      for (const condition of winConditions) {
        const playerSpots = condition.filter((spot) =>
          player1ClaimedSpots.includes(spot)
        );
        const emptySpots = condition.filter(
          (spot) =>
            !player1ClaimedSpots.includes(spot) &&
            !player2ClaimedSpots.includes(spot)
        );

        if (playerSpots.length === 2 && emptySpots.length === 1) {
          newSpot = emptySpots[0];
          break;
        }
      }

      if (newSpot === null) {
        const availableSpots = Array.from({length: 9}, (_, i) => i + 1).filter(
          (spot) =>
            !player1ClaimedSpots.includes(spot) &&
            !player2ClaimedSpots.includes(spot)
        );
        newSpot =
          availableSpots[Math.floor(Math.random() * availableSpots.length)];
      }
      player2ClaimedSpots.push(newSpot);
      if (checkWinCondition(turn)) {
        setGameOver(turn);
      } else if (
        player1ClaimedSpots.length + player2ClaimedSpots.length ===
        9
      ) {
        setGameOver("Draw");
      } else {
        setTurn("Player 1");
      }
    }
  }, [turn]);

  return (
    <GameLayout
      onReset={resetGame}
      gameOver={Boolean(gameOver)}
      status="lose"
      additionalText={`${
        gameOver === "Draw"
          ? "Draw!"
          : options.computerOpponent === 1 && gameOver === "Player 2"
          ? "Computer Wins!"
          : gameOver + " Wins!"
      } `}
    >
      <h1 className="text-xl text-center">
        Turn: <span className="text-theme-300">{turn}</span>{" "}
        <span className="text-gray-500">
          ({turn === "Player 1" ? "X" : "O"})
        </span>
      </h1>
      <div className="flex text-2xl mt-14">
        <TicTacToeSquare
          index={1}
          player1ClaimedSpots={player1ClaimedSpots}
          player2ClaimedSpots={player2ClaimedSpots}
          clickHandler={clickHandler}
        />
        <TicTacToeSquare
          index={2}
          player1ClaimedSpots={player1ClaimedSpots}
          player2ClaimedSpots={player2ClaimedSpots}
          clickHandler={clickHandler}
          className="border-x-2"
        />
        <TicTacToeSquare
          index={3}
          player1ClaimedSpots={player1ClaimedSpots}
          player2ClaimedSpots={player2ClaimedSpots}
          clickHandler={clickHandler}
        />
      </div>
      <div className="flex text-2xl">
        <TicTacToeSquare
          index={4}
          player1ClaimedSpots={player1ClaimedSpots}
          player2ClaimedSpots={player2ClaimedSpots}
          clickHandler={clickHandler}
          className="border-y-2"
        />
        <TicTacToeSquare
          index={5}
          player1ClaimedSpots={player1ClaimedSpots}
          player2ClaimedSpots={player2ClaimedSpots}
          clickHandler={clickHandler}
          className="border-2"
        />
        <TicTacToeSquare
          index={6}
          player1ClaimedSpots={player1ClaimedSpots}
          player2ClaimedSpots={player2ClaimedSpots}
          clickHandler={clickHandler}
          className="border-y-2"
        />
      </div>
      <div className="flex text-2xl">
        <TicTacToeSquare
          index={7}
          player1ClaimedSpots={player1ClaimedSpots}
          player2ClaimedSpots={player2ClaimedSpots}
          clickHandler={clickHandler}
        />
        <TicTacToeSquare
          index={8}
          player1ClaimedSpots={player1ClaimedSpots}
          player2ClaimedSpots={player2ClaimedSpots}
          clickHandler={clickHandler}
          className="border-x-2"
        />
        <TicTacToeSquare
          index={9}
          player1ClaimedSpots={player1ClaimedSpots}
          player2ClaimedSpots={player2ClaimedSpots}
          clickHandler={clickHandler}
        />
      </div>
      <button
        className=" cursor-pointer flex items-center bg-theme-300 hover:bg-pink-600 mt-14 px-4 py-1.5 rounded-full w-min text-white text-center whitespace-nowrap duration-300"
        onClick={resetGame}
      >
        Reset
      </button>
    </GameLayout>
  );
}
