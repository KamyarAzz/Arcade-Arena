import GameLayout from "@/components/ui/GameLayout";
import GameTitle from "@/components/ui/GameTitle";
import {useEffect, useRef, useState} from "react";
import dinoImage from "@/assets/dinosaur/dinosaurModel.svg";
import obstacleImage from "@/assets/dinosaur/obstacle.png";

export default function DinosaurGame() {
  const [animation, setAnimation] = useState<"jumping" | "landing" | "idle">(
    "idle"
  );
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(20);
  const [obstacle, setObstacle] = useState<{x: number}>({x: 500});

  const speedRef = useRef(speed);

  useEffect(() => {
    if (speed > 10) speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setScore((prevScore) => prevScore + 1);
    }, 1);

    const speedInterval = setInterval(() => {
      if (speed > 10) {
        setSpeed((prev) => {
          const newSpeed = prev - 1;
          if (prev > 10) {
            speedRef.current = newSpeed;
            return newSpeed;
          } else return prev;
        });
      }
    }, 5000);

    if (speed <= 10) clearInterval(speedInterval);

    return () => {
      clearInterval(scoreInterval);
      clearInterval(speedInterval);
    };
  }, []);

  useEffect(() => {
    addEventListener("keydown", (e) => {
      if (e.key === " ") jumpHandler();
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setObstacle((prev) => {
        const newX = prev.x <= 0 ? 500 : prev.x - speedRef.current;
        return {x: newX};
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (animation === "jumping")
      setTimeout(() => {
        setAnimation("landing");
      }, 300);
    else if (animation === "landing")
      setTimeout(() => {
        setAnimation("idle");
      }, 300);
  }, [animation]);

  useEffect(() => {
    if (!gameOver) {
      checkCollision();
    }
  }, [obstacle, gameOver]);

  const jumpHandler = () => {
    if (animation === "idle") setAnimation("jumping");
  };

  const checkCollision = () => {
    if (
      (animation === "landing" || animation === "idle") &&
      obstacle.x < 60 &&
      obstacle.x + 8 > 60
    ) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setObstacle({x: 500});
    setScore(0);
    setSpeed(20);
  };

  return (
    <>
      <GameTitle title="Dinosaur Game" />
      <GameLayout gameOver={gameOver} status="lose" onReset={resetGame}>
        <h1 className="text-2xl">
          Score: <span className="text-theme-300">{score}</span>
        </h1>
        <div className="relative w-full mt-10 overflow-hidden border-b-8 rounded-sm min-h-80 bg-mainBg-200 border-theme-200">
          <div
            className={`${
              animation === "jumping" ? "bottom-20" : "bottom-0"
            } transition-all bottom-0 duration-300 ease-linear absolute left-4 w-28 h-28 flex items-end`}
          >
            <img className="w-full " src={dinoImage} alt="Dinosaur" />
          </div>
          <div
            style={{left: obstacle.x + "px"}}
            className="absolute bottom-0 flex items-end w-8 h-6"
          >
            <img className="w-full" src={obstacleImage} alt="Obstacle" />
          </div>
        </div>
      </GameLayout>
    </>
  );
}
