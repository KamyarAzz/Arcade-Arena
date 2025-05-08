type Props = {
  index: number;
  clickHandler: (spot: number) => void;
  player1ClaimedSpots: number[];
  player2ClaimedSpots: number[];
  className?: string;
};

export default function TicTacToeSquare({
  index,
  player1ClaimedSpots,
  player2ClaimedSpots,
  clickHandler,
  className,
}: Props) {
  return (
    <div
      className={`${className} ${
        player1ClaimedSpots.includes(index) ||
        player2ClaimedSpots.includes(index)
          ? "cursor-auto"
          : "cursor-pointer"
      } flex items-center justify-center w-20 h-20`}
      onClick={() => clickHandler(index)}
    >
      {player1ClaimedSpots.includes(index)
        ? "X"
        : player2ClaimedSpots.includes(index) && "O"}
    </div>
  );
}
