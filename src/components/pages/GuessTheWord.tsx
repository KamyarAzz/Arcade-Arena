import GameLayout from "@/components/ui/GameLayout";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import WordInput from "../WordInput";
const API_URL = "https://cheaderthecoder.github.io/5-Letter-words/words.json";

export default function GuessTheWord() {
  const [solution, setSolution] = useState("");
  const [answers, setAnswers] = useState<string[][]>(
    Array(6).fill(Array(5).fill(""))
  );
  const [currentLevel, setCurrentLevel] = useState(0);
  const [statusList, setStatusList] = useState<string[][]>([]);
  const [gameOver, setGameOver] = useState<undefined | "lose" | "win">(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setSolution(
            data.words[Math.floor(Math.random() * data.words.length)]
          );
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/");
      }
    };

    fetchData();
  }, []);

  const checkAnswer = () => {
    if (answers[currentLevel].includes("")) {
      alert("Not a correct 5-Letter word!");
      return;
    }
    createStatusList(answers[currentLevel].join("").toLowerCase());
    if (currentLevel + 1 === 6) {
      setGameOver("lose");
    } else if (answers[currentLevel].join("").toLowerCase() === solution) {
      setGameOver("win");
    } else {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const resetGame = () => {
    setGameOver(undefined);
    setAnswers(Array(6).fill(""));
    setCurrentLevel(0);
  };

  const createStatusList = (word: string) => {
    const newList: string[] = [];
    [...word].map((letter: string, i: number) => {
      if (letter === solution[i]) newList.push("green");
      else if (solution.includes(letter)) newList.push("yellow");
      else newList.push("gray");
    });
    setStatusList((prevList) => [...prevList, newList]);
  };

  return (
    <GameLayout
      title="Guess the Word"
      gameOver={Boolean(gameOver)}
      status={gameOver}
      onReset={resetGame}
      additionalText={`The word was: ${solution}`}
    >
      {answers.map((answer, index) => (
        <WordInput
          index={index}
          statusList={statusList[index] || null}
          key={index}
          value={answer}
          disabled={currentLevel !== index}
          setValue={setAnswers}
        />
      ))}

      <button
        onClick={checkAnswer}
        className="!z-50 flex items-center bg-theme-300 hover:bg-pink-600 mt-4 px-4 py-1.5 rounded-full w-min text-white text-center whitespace-nowrap duration-300"
      >
        Enter
      </button>
    </GameLayout>
  );
}
