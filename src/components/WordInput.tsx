// import {useEffect} from "react";

import LetterInput from "./LetterInput";

type Props = {
  disabled: boolean;
  setValue: React.Dispatch<React.SetStateAction<string[][]>>;
  value: string[];
  statusList: string[] | null;
  index: number;
};

export default function WordInput({
  disabled,
  setValue,
  value,
  statusList,
  index,
}: Props) {
  const updateCharacter = (charIndex: number, newChar: string) => {
    setValue((prevList: string[][]) => {
      const newList = prevList.map((innerArray, i) => {
        if (i === index) {
          const updatedInner = [...innerArray];
          updatedInner[charIndex] = newChar;
          return updatedInner;
        }
        return innerArray;
      });
      return newList;
    });
  };

  return (
    <div className="flex flex-row items-center justify-center gap-5 p-2">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <LetterInput
            statusList={statusList ? statusList[i] : null}
            key={i}
            index={i}
            disabled={disabled}
            handleChange={updateCharacter}
            value={value[i] || ""}
          />
        ))}
    </div>
  );
}
