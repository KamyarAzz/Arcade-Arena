import GameSettings from "@/components/ui/GameSettings";
import GameTitle from "@/components/ui/GameTitle";
import {useState} from "react";
import MemoryGame from "./MemoryGame";

const cardOptions = [
  {title: "Few", value: 5},
  {title: "Normal", value: 10},
  {title: "Many", value: 15},
];

const heartOptions = [
  {title: "Easy", value: 3},
  {title: "Normal", value: 5},
  {title: "Hard", value: 10},
];

export default function MemoryGameSettings() {
  const [hasSetOptions, setHasSetOptions] = useState(false);

  const [options, setOptions] = useState({
    cardsAmount: cardOptions[1].value,
    totalHearts: heartOptions[1].value,
  });

  const settingSubmitHandler = (cardsAmount: number, totalHearts: number) => {
    setOptions({cardsAmount, totalHearts});
    setHasSetOptions(true);
  };

  return (
    <>
      <GameTitle title="Minesweeper" />
      {!hasSetOptions ? (
        <GameSettings
          submitHandler={settingSubmitHandler}
          value1Title="the amount of cards"
          value2Title="game difficulty"
          values1={cardOptions}
          values2={heartOptions}
        />
      ) : (
        <MemoryGame options={options} />
      )}
    </>
  );
}
