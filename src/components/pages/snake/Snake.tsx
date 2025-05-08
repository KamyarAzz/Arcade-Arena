import GameLayout from "@/components/ui/GameLayout";
import {useEffect, useRef, useState} from "react";
import SnakeControls from "./SnakeControls";

type Props = {
  options: {size: number; speed: number};
};

export default function Snake({options}: Props) {
  const cooldownRef = useRef(false);
  const highscore = localStorage.getItem("snakeHighscore");
  const [snake, setSnake] = useState([{x: 2, y: 2}]);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState({x: 1, y: 0});
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * options.size),
    y: Math.floor(Math.random() * options.size),
  });
  const [gameOver, setGameOver] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkIsMobile = () => {
    return window.innerWidth <= 600;
  };

  useEffect(() => {
    setIsMobile(checkIsMobile());

    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (cooldownRef.current) return;
    let newDirection = {...direction};

    switch (event.key) {
      case "ArrowUp":
      case "w":
      case "W":
        if (direction.y === 0) newDirection = {x: 0, y: -1};
        break;
      case "ArrowDown":
      case "s":
      case "S":
        if (direction.y === 0) newDirection = {x: 0, y: 1};
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        if (direction.x === 0) newDirection = {x: -1, y: 0};
        break;
      case "ArrowRight":
      case "d":
      case "D":
        if (direction.x === 0) newDirection = {x: 1, y: 0};
        break;
      default:
        break;
    }

    if (newDirection !== direction) {
      setDirection(newDirection);
      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, options.speed);
    }
  };

  const handleTouch = (touchDirection: "up" | "down" | "left" | "right") => {
    if (cooldownRef.current) return;
    let newDirection = {...direction};

    switch (touchDirection) {
      case "up":
        if (direction.y === 0) newDirection = {x: 0, y: -1};
        break;
      case "down":
        if (direction.y === 0) newDirection = {x: 0, y: 1};
        break;
      case "left":
        if (direction.x === 0) newDirection = {x: -1, y: 0};
        break;
      case "right":
        if (direction.x === 0) newDirection = {x: 1, y: 0};
        break;
    }

    if (newDirection !== direction) {
      setDirection(newDirection);
      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, options.speed);
    }
  };

  const handleFoodEat = () => {
    let newFoodPosition = {
      x: Math.floor(Math.random() * options.size),
      y: Math.floor(Math.random() * options.size),
    };

    while (
      snake.some(
        (segment) =>
          segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
      )
    ) {
      newFoodPosition = {
        x: Math.floor(Math.random() * options.size),
        y: Math.floor(Math.random() * options.size),
      };
    }

    setFood(newFoodPosition);
    setScore((prevScore) => prevScore + 10);
  };

  const gameOverHandler = () => {
    setGameOver(true);
    setTimeout(() => {
      if (!highscore || score > +highscore)
        localStorage.setItem("snakeHighscore", String(score));
    }, 1500);
  };

  const moveSnake = () => {
    if (gameOver) return;
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };
    if (
      head.x < 0 ||
      head.x >= options.size ||
      head.y < 0 ||
      head.y >= options.size
    ) {
      gameOverHandler();
      return;
    }
    if (
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      gameOverHandler();
      return;
    }
    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      handleFoodEat();
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const handleGameReset = () => {
    setGameOver(false);
    setFood({
      x: Math.floor(Math.random() * options.size),
      y: Math.floor(Math.random() * options.size),
    });
    setSnake([{x: 2, y: 2}]);
    setDirection({x: 1, y: 0});
    setScore(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, options.speed);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  return (
    <GameLayout
      gameOver={gameOver}
      score={score}
      onReset={handleGameReset}
      highscore={highscore ? +highscore : 0}
    >
      <h1 className="text-xl text-center md:text-3xl">Score: {score}</h1>
      <div className="flex flex-wrap justify-center items-center mt-10 w-[25rem] h-[25rem] md:scale-100 scale-75">
        {Array.from({length: options.size * options.size}).map((_, index) => {
          const row = Math.floor(index / options.size);
          const col = index % options.size;
          const isEvenRow = row % 2 === 0;
          const isEvenCol = col % 2 === 0;
          const colorClass =
            (isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol)
              ? "bg-purple-800"
              : "bg-purple-900";
          const isSnake = snake.some(
            (segment) => segment.x === col && segment.y === row
          );
          const isHead = snake[0].x === col && snake[0].y === row;
          const isFood = food.x === col && food.y === row;
          return (
            <div
              key={index}
              className={`${
                options.size === 5
                  ? "w-20 h-20 min-h-20 min-w-20 max-h-20 max-w-20"
                  : options.size === 10
                  ? "w-10 h-10 min-h-10 min-w-10 max-h-10 max-w-10"
                  : options.size === 20 &&
                    "w-5 h-5 min-h-5 min-w-5 max-h-5 max-w-5"
              }  flex items-center justify-center ${colorClass}`}
            >
              {isFood ? (
                <div className="w-6 h-6">🍎</div>
              ) : (
                isSnake && (
                  <div
                    className={`flex justify-center items-center gap-2 bg-red-500 w-full h-full`}
                  >
                    {isHead && (
                      <>
                        <div className="flex justify-center items-center bg-white p-[4px] rounded-full w-[12px] h-[12px]">
                          <div className="flex items-center justify-center w-full h-full bg-black rounded-full"></div>
                        </div>
                        <div className="flex justify-center items-center bg-white p-[4px] rounded-full w-[12px] h-[12px]">
                          <div className="flex items-center justify-center w-full h-full bg-black rounded-full"></div>
                        </div>
                      </>
                    )}
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>
      {isMobile && <SnakeControls handleTouch={handleTouch} />}
    </GameLayout>
  );
}
