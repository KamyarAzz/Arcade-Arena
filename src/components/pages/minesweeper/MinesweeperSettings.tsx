import GameSettings from "@/components/ui/GameSettings";
import {useState} from "react";
import Minesweeper from "./Minesweeper";
import GameTitle from "@/components/ui/GameTitle";

const sizeOptions = [
  {title: "Small", value: 6},
  {title: "Normal", value: 10},
  {title: "Big", value: 15},
];

const bombOptions = [
  {title: "Few", value: 5},
  {title: "Normal", value: 20},
  {title: "Many", value: 30},
];

export default function MinesweeperSettings() {
  const [hasSetOptions, setHasSetOptions] = useState(false);

  const [options, setOptions] = useState({
    size: sizeOptions[1].value,
    bombs: bombOptions[1].value,
  });

  const settingSubmitHandler = (size: number, bombs: number) => {
    setOptions({size, bombs});
    setHasSetOptions(true);
  };

  return (
    <>
      <GameTitle title="Minesweeper" />
      {!hasSetOptions ? (
        <GameSettings
          submitHandler={settingSubmitHandler}
          value1Title="Game Size"
          value2Title="Game Bombs"
          values1={sizeOptions}
          values2={bombOptions}
        />
      ) : (
        <Minesweeper options={options} />
      )}
    </>
  );
}
