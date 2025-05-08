// import {useEffect} from "react";

import {useEffect, useRef} from "react";
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
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(5).fill(null));

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

    if (newChar && charIndex < 4) {
      inputRefs.current[charIndex + 1]?.focus();
    }
  };

  const handleBackspace = (charIndex: number) => {
    if (charIndex > 0) {
      inputRefs.current[charIndex - 1]?.focus();
    }
  };

  useEffect(() => {
    if (!disabled) inputRefs.current[0]?.focus();
  }, [disabled]);

  return (
    <div className="flex flex-row items-center justify-center gap-5 p-2">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <LetterInput
            onBackspace={handleBackspace}
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current[i] = el;
            }}
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
