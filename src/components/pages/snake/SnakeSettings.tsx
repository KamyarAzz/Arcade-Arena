import GameSettings from "@/components/ui/GameSettings";
import {useState} from "react";
import Snake from "./Snake";
import GameTitle from "@/components/ui/GameTitle";

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

export default function SnakeSettings() {
  const [hasSetOptions, setHasSetOptions] = useState(false);

  const [options, setOptions] = useState({
    size: sizeOptions[1].value,
    speed: speedOptions[1].value,
  });

  const settingSubmitHandler = (size: number, speed: number) => {
    setOptions({size, speed});
    setHasSetOptions(true);
  };

  return (
    <>
      <GameTitle title="Snake Game" />
      {!hasSetOptions ? (
        <GameSettings
          submitHandler={settingSubmitHandler}
          value1Title="Game Size"
          value2Title="Game Speed"
          values1={sizeOptions}
          values2={speedOptions}
        />
      ) : (
        <Snake options={options} />
      )}
    </>
  );
}
