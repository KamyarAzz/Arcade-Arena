import GameSettings from "@/components/ui/GameSettings";
import GameTitle from "@/components/ui/GameTitle";
import {useState} from "react";
import TicTacToe from "./TicTacToe";

const opponentOptions = [
  {title: "Player", value: 0},
  {title: "AI", value: 1},
];

export default function TicTacToeSettings() {
  const [hasSetOptions, setHasSetOptions] = useState(false);

  const [options, setOptions] = useState({
    computerOpponent: opponentOptions[1].value,
  });

  const settingSubmitHandler = (computerOpponent: number) => {
    setOptions({computerOpponent});
    setHasSetOptions(true);
  };

  return (
    <>
      <GameTitle title="Tic Tac Toe" />
      {!hasSetOptions ? (
        <GameSettings
          submitHandler={settingSubmitHandler}
          value1Title="opponent"
          values1={opponentOptions}
        />
      ) : (
        <TicTacToe options={options} />
      )}
    </>
  );
}
