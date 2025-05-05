import GameLayout from "@/components/ui/GameLayout";
import {useEffect, useState} from "react";
import GameSettings from "../ui/GameSettings";

const sizeOptions = [
  {title: "Small", value: 5},
  {title: "Normal", value: 10},
  {title: "Big", value: 20},
];

const speedOptions = [
  {title: "Slow", value: 300},
  {title: "Normal", value: 200},
  {title: "Fast", value: 100},
];

export default function Snake() {
  const highscore = localStorage.getItem("snakeHighscore");
  const [details, setDetails] = useState({
    speed: speedOptions[1].value,
    size: sizeOptions[1].value,
  });
  const [hasSetDetails, setHasSetDetails] = useState(false);
  const [snake, setSnake] = useState([{x: 2, y: 2}]);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState({x: 1, y: 0});
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * details.size),
    y: Math.floor(Math.random() * details.size),
  }); // Initial food position
  const [gameOver, setGameOver] = useState(false);

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
      case "w": // Handle lowercase 'w' as well
      case "W": // Handle uppercase 'W'
        if (direction.y === 0) setDirection({x: 0, y: -1});
        break;
      case "ArrowDown":
      case "s": // Handle lowercase 's'
      case "S": // Handle uppercase 'S'
        if (direction.y === 0) setDirection({x: 0, y: 1});
        break;
      case "ArrowLeft":
      case "a": // Handle lowercase 'a'
      case "A": // Handle uppercase 'A'
        if (direction.x === 0) setDirection({x: -1, y: 0});
        break;
      case "ArrowRight":
      case "d": // Handle lowercase 'd'
      case "D": // Handle uppercase 'D'
        if (direction.x === 0) setDirection({x: 1, y: 0});
        break;
      default:
        break;
    }
  };

  const handleFoodEat = () => {
    // Generate new food position
    setFood({
      x: Math.floor(Math.random() * details.size),
      y: Math.floor(Math.random() * details.size),
    });
    setScore((prevScore) => prevScore + 10);
  };

  const gameOverHandler = () => {
    setGameOver(true);
    // set new highscore with a delay
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

    // Check for collisions with walls
    if (
      head.x < 0 ||
      head.x >= details.size ||
      head.y < 0 ||
      head.y >= details.size
    ) {
      gameOverHandler();
      return;
    }

    // Check for collisions with itself
    if (
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      gameOverHandler();
      return;
    }

    newSnake.unshift(head); // Add new head to the snake

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
      handleFoodEat();
    } else {
      newSnake.pop(); // Remove the tail if not eating
    }

    setSnake(newSnake);
  };

  const handleGameReset = () => {
    setGameOver(false);
    setFood({
      x: Math.floor(Math.random() * details.size),
      y: Math.floor(Math.random() * details.size),
    });
    setSnake([{x: 2, y: 2}]);
    setDirection({x: 1, y: 0});
    setScore(0);
  };

  // Set up the game loop
  useEffect(() => {
    if (hasSetDetails) {
      const interval = setInterval(() => {
        moveSnake();
      }, details.speed); // Move the snake every 200ms
      return () => clearInterval(interval);
    }
  }, [snake, direction, gameOver, hasSetDetails]);

  // Handle key presses
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  const settingSubmitHandler = (size: number, speed: number) => {
    setDetails({speed, size});
    setHasSetDetails(true);
  };

  return (
    <GameLayout
      gameOver={gameOver}
      score={score}
      onReset={handleGameReset}
      title="Snake Game"
      highscore={highscore ? +highscore : 0}
    >
      <h1 className="text-3xl text-center">Score: {score}</h1>
      <div className="flex flex-wrap justify-center items-center mt-10 w-[25rem] h-[25rem]">
        {!hasSetDetails ? (
          <GameSettings
            submitHandler={settingSubmitHandler}
            value1Title="Game Size"
            value2Title="Game Speed"
            values1={sizeOptions}
            values2={speedOptions}
          />
        ) : (
          Array.from({length: details.size * details.size}).map((_, index) => {
            const row = Math.floor(index / details.size);
            const col = index % details.size;
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
                  details.size === 5
                    ? "w-20 h-20 min-h-20 min-w-20 max-h-20 max-w-20"
                    : details.size === 10
                    ? "w-10 h-10 min-h-10 min-w-10 max-h-10 max-w-10"
                    : details.size === 20 &&
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
          })
        )}
      </div>
    </GameLayout>
  );
}
