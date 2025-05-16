import GameLayout from "@/components/ui/GameLayout";
import {useEffect, useState} from "react";

type coordinate = [number, number];

type Props = {
  options: {size: number; bombs: number};
};

export default function Minesweeper({options}: Props) {
  const generateBombs = (bombsAmount: number) => {
    const array: coordinate[] = [];
    while (array.length < bombsAmount) {
      const x = Math.floor(Math.random() * options.size);
      const y = Math.floor(Math.random() * options.size);
      if (!array.find((item) => item[0] === x && item[1] === y))
        array.push([x, y]);
    }
    return array;
  };

  const [bombLocations, setBombLocations] = useState<coordinate[]>([]);

  const [clearedLocations, setClearedLocations] = useState<coordinate[]>([]);
  const [flaggedLocations, setFlaggedLocations] = useState<coordinate[]>([]);
  const [clickMode, setClickMode] = useState<"shovel" | "flag">("shovel");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<undefined | "lose" | "win">(
    undefined
  );

  const checkIsMobile = () => {
    return window.innerWidth <= 600;
  };

  useEffect(() => {
    setIsMobile(checkIsMobile());
    setBombLocations(generateBombs(options.bombs));
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const clickHandler = (x: number, y: number) => {
    if (isMobile) {
      if (clickMode === "flag") rightClickHandler(x, y);
      else leftClickHandler(x, y);
    } else leftClickHandler(x, y);
  };

  const leftClickHandler = (x: number, y: number) => {
    if (!clearedLocations.find((item) => item[0] === x && item[1] === y)) {
      if (checkIfIsBomb(x, y)) {
        setGameOver("lose");
      } else {
        setClearedLocations((prevClearedLocations) => [
          ...prevClearedLocations,
          [x, y],
        ]);
        if (checkNearbyBombs(x, y) === " ") handleNoBombsAround(x, y);
        if (
          clearedLocations.length + 1 ===
          options.size * options.size - options.bombs
        ) {
          setGameOver("win");
        }
      }
    }
  };

  const rightClickHandler = (
    x: number,
    y: number,
    event?: React.MouseEvent
  ) => {
    if (event) event.preventDefault();
    if (!clearedLocations.find((item) => item[0] === x && item[1] === y)) {
      const index = flaggedLocations.findIndex(
        (item) => item[0] === x && item[1] === y
      );
      if (index === -1) {
        setFlaggedLocations((prevFlaggedLocations) => [
          ...prevFlaggedLocations,
          [x, y],
        ]);
      } else {
        setFlaggedLocations((prevFlaggedLocations) =>
          prevFlaggedLocations.filter((_, i) => i !== index)
        );
      }
    }
  };

  const handleNoBombsAround = (x: number, y: number) => {
    console.log(1);
    const newClearLocations: coordinate[] = [];
    for (let i = -1; i < 2; i++) {
      if (x + i >= 0) {
        for (let j = -1; j < 2; j++) {
          if (y + j >= 0) {
            if (
              !clearedLocations.find(
                (item) => item[0] === x + i && item[1] === y + j
              ) &&
              !(i === 0 && j === 0)
            ) {
              newClearLocations.push([x + i, y + j]);
            }
          }
        }
      }
    }
    console.log(newClearLocations);
    setClearedLocations((prevClearedLocations) => [
      ...prevClearedLocations,
      ...newClearLocations,
    ]);
    newClearLocations.map((loc) => {
      if (checkNearbyBombs(loc[0], loc[1]) === " ")
        handleNoBombsAround(loc[0], loc[1]);
    });
  };

  const checkNearbyBombs = (x: number, y: number) => {
    if (checkIfIsBomb(x, y)) return "*";
    let amount = 0;
    bombLocations.map((item) => {
      if (
        (item[0] === x && (item[1] === y + 1 || item[1] === y - 1)) ||
        (item[0] === x + 1 &&
          (item[1] === y || item[1] === y + 1 || item[1] === y - 1)) ||
        (item[0] === x - 1 &&
          (item[1] === y || item[1] === y + 1 || item[1] === y - 1))
      ) {
        return amount++;
      }
    });
    if (amount === 0) {
      return " ";
    }
    return amount;
  };

  const checkIfIsBomb = (x: number, y: number) => {
    return Boolean(
      bombLocations.find((item) => item[0] === x && item[1] === y)
    );
  };

  const resetGame = () => {
    setClearedLocations([]);
    setFlaggedLocations([]);
    setBombLocations(generateBombs(options.bombs));
    setGameOver(undefined);
  };

  return (
    <GameLayout
      gameOver={Boolean(gameOver)}
      status={gameOver}
      onReset={resetGame}
    >
      <>
        <h1 className="mb-6">
          Bombs Left:{" "}
          <span className="text-theme-300">
            {options.bombs - flaggedLocations.length}
          </span>
        </h1>
        <table className="gap-2 border border-collapse border-gray-500">
          <tbody>
            {Array(options.size)
              .fill("")
              .map((_, i) => (
                <tr className="gap-2" key={i}>
                  {Array(options.size)
                    .fill("")
                    .map((_, j) => (
                      <td
                        onContextMenu={(e) => rightClickHandler(i, j, e)}
                        onClick={() => clickHandler(i, j)}
                        className={`${
                          clearedLocations.find(
                            (item) => item[0] === i && item[1] === j
                          )
                            ? "bg-gray-800 text-white"
                            : flaggedLocations.find(
                                (item) => item[0] === i && item[1] === j
                              )
                            ? "bg-gray-800 cursor-pointer"
                            : "cursor-pointer text-transparent"
                        } w-10 h-10 border border-gray-500 shadow-2xl text-center`}
                        key={j}
                      >
                        {bombLocations &&
                        flaggedLocations.find(
                          (item) => item[0] === i && item[1] === j
                        ) ? (
                          <div className="flex items-center justify-center w-full h-full">
                            <svg
                              className="w-4"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z" />
                            </svg>
                          </div>
                        ) : (
                          checkNearbyBombs(i, j)
                        )}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
        {isMobile && (
          <div className="flex gap-4 mt-8">
            <div
              onClick={() => setClickMode("shovel")}
              className={`${
                clickMode === "shovel" ? "bg-theme-300" : "bg-transparent"
              } flex cursor-pointer items-center justify-center p-2.5 border-2 border-theme-300 rounded-full w-12`}
            >
              <svg
                fill="white"
                className="w-full aspect-square"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M361.4 9.4c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-44.1 44.1c-18.7 18.7-44.1 29.3-70.6 29.3c-15.9 0-30.9-3.7-44.3-10.3l-97 97 50.7 50.7c12.5 12.5 12.5 32.8 0 45.3l-58.5 58.5c-30 30-70.7 46.9-113.1 46.9H32c-17.7 0-32-14.3-32-32V386.3c0-42.4 16.9-83.1 46.9-113.1l58.5-58.5c12.5-12.5 32.8-12.5 45.3 0l50.7 50.7 97-97C291.7 155.1 288 140 288 124.1c0-26.5 10.5-51.9 29.3-70.6L361.4 9.4zM384 77.3L362.5 98.7c-6.7 6.7-10.5 15.9-10.5 25.4c0 19.8 16.1 35.9 35.9 35.9c9.5 0 18.6-3.8 25.4-10.5L434.7 128 384 77.3z" />
              </svg>
            </div>
            <div
              onClick={() => setClickMode("flag")}
              className={`${
                clickMode === "flag" ? "bg-theme-300" : "bg-transparent"
              } flex cursor-pointer items-center justify-center p-2.5 border-2 border-theme-300 rounded-full w-12`}
            >
              <svg
                className="w-full aspect-square"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z" />
              </svg>
            </div>
          </div>
        )}
      </>
    </GameLayout>
  );
}
