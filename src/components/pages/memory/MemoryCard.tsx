import {useEffect, useState} from "react";
// import backgroundImage from "@/assets/puzzle/background.jpg";
type Props = {
  item: {title: string; src: string};
  clickHandler: (title: string) => void;
  isMatched: boolean;
  selectedCardLength: number;
  selected: boolean;
};

export default function MemoryCard({
  item,
  isMatched,
  clickHandler,
  selectedCardLength,
  selected,
}: Props) {
  const [flipped, setFlipped] = useState(isMatched || false);

  const cardClickHandler = () => {
    if (!isMatched) {
      if (selectedCardLength < 2) setFlipped(true);
      clickHandler(item.title);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!isMatched && selectedCardLength === 0) setFlipped(false);
    }, 500);
  }, [isMatched, selectedCardLength]);

  useEffect(() => {
    if (isMatched) setFlipped(true);
  }, [isMatched]);

  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(0deg)" : "rotateY(180deg)",
      }}
      onClick={cardClickHandler}
      className={`relative w-16 md:w-20 aspect-[9/16] bg-slate-800 transition-transform duration-500 ease-in-out rounded-md shadow-lg cursor-pointer ${
        flipped ? "rotate-y-0 cursor-default" : "rotate-y-180 cursor-pointer"
      } ${selected ? "shadow-lg shadow-theme-300" : ""}`}
    >
      <img
        style={{backfaceVisibility: "hidden"}}
        src={item.src}
        alt={item.title}
        className="absolute w-4/5 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        draggable={false}
      />
      <div
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          opacity: 0.8,
          background:
            "linear-gradient(135deg, var(--primary-theme) 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, var(--secondary-theme) 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, var(--primary-theme) 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, var(--secondary-theme) 25%, transparent 25%) 0px 0/ 20px 20px",
        }}
        className="absolute object-cover w-full h-full rounded-md bg-mainBg-300"
        draggable={false}
      />
    </div>
  );
}
