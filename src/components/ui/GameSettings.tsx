import {useState} from "react";

type ValueType = {
  title: string;
  value: number;
};

type Props = {
  submitHandler: (value1: number, value2: number) => void;
  values1: ValueType[];
  values2: ValueType[];
  value1Title: string;
  value2Title: string;
};

export default function GameSettings({
  submitHandler,
  values1,
  values2,
  value1Title,
  value2Title,
}: Props) {
  const [value1, setValue1] = useState(values1[1].value);
  const [value2, setValue2] = useState(values2[1].value);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 px-16 border-2 border-gray-700 rounded-lg shadow-inner bg-mainBg-200">
      <h1>Select {value1Title}</h1>
      <div className="flex items-center gap-8">
        {values1.map((item) => (
          <div
            onClick={() => setValue1(item.value)}
            className={`px-5 py-1.5 border-2 border-theme-300 duration-150 rounded-full ${
              value1 === item.value
                ? "bg-theme-300 cursor-default hober-bg-theme-100"
                : "cursor-pointer hover:border-theme-100"
            }`}
          >
            {item.title}
          </div>
        ))}
      </div>
      <h1 className="mt-6">Select {value2Title}</h1>
      <div className="flex items-center gap-8">
        {values2.map((item) => (
          <div
            onClick={() => setValue2(item.value)}
            className={`px-5 py-1.5 border-2 border-theme-300 duration-150 rounded-full ${
              value2 === item.value
                ? "bg-theme-300 cursor-default hober-bg-theme-100"
                : "cursor-pointer hover:border-theme-100"
            }`}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div
        className="mt-5 text-2xl italic font-bold duration-150 cursor-pointer hover:text-theme-300"
        onClick={() => submitHandler(value1, value2)}
      >
        Play
      </div>
    </div>
  );
}
