import GameLayout from "@/components/ui/GameLayout";
import asset1 from "@/assets/puzzle/Asset 1.svg";
import asset2 from "@/assets/puzzle/Asset 2.svg";
import asset3 from "@/assets/puzzle/Asset 3.svg";
import asset4 from "@/assets/puzzle/Asset 4.svg";
import asset5 from "@/assets/puzzle/Asset 5.svg";
import asset6 from "@/assets/puzzle/Asset 6.svg";
import asset7 from "@/assets/puzzle/Asset 7.svg";
import asset8 from "@/assets/puzzle/Asset 8.svg";
import asset9 from "@/assets/puzzle/Asset 9.svg";
import asset10 from "@/assets/puzzle/Asset 10.svg";
import asset11 from "@/assets/puzzle/Asset 11.svg";
import asset12 from "@/assets/puzzle/Asset 12.svg";
import asset13 from "@/assets/puzzle/Asset 13.svg";
import asset14 from "@/assets/puzzle/Asset 14.svg";
import asset15 from "@/assets/puzzle/Asset 15.svg";
import MemoryCard from "../MemoryCard";
import {useEffect, useState} from "react";

const items = [
  {title: "asset1", src: asset1},
  {title: "asset2", src: asset2},
  {title: "asset3", src: asset3},
  {title: "asset4", src: asset4},
  {title: "asset5", src: asset5},
  {title: "asset6", src: asset6},
  {title: "asset7", src: asset7},
  {title: "asset8", src: asset8},
  {title: "asset9", src: asset9},
  {title: "asset10", src: asset10},
  {title: "asset11", src: asset11},
  {title: "asset12", src: asset12},
  {title: "asset13", src: asset13},
  {title: "asset14", src: asset14},
  {title: "asset15", src: asset15},
];

const amount: 5 | 10 | 15 = 10;

export default function MemoryGame() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [lives, setLives] = useState(3);
  const displayedItems = items.slice(0, amount);

  const clickHandler = (title: string) => {
    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [...prevSelectedCards, title]);
    }
  };

  useEffect(() => {
    const checkCards = () => {
      if (selectedCards[0] === selectedCards[1]) {
        setMatchedCards((prevMatchedCards) => [
          ...prevMatchedCards,
          selectedCards[0],
        ]);
      } else {
        setLives(lives - 1);
      }
      setSelectedCards([]);
    };

    if (selectedCards.length === 2) {
      checkCards();
    }
  }, [selectedCards]);

  // useEffect(() => {
  //   console.log(selectedCards);
  //   console.log(matchedCards);
  // }, [selectedCards, matchedCards]);

  return (
    <GameLayout title="Memory Game">
      <div
        className={`${
          amount === 5
            ? "grid-cols-5"
            : amount === 10
            ? "md:grid-cols-10 grid-cols-5"
            : "md:grid-cols-10 grid-cols-4"
        } grid gap-4 gap-y-10`}
      >
        {displayedItems.map((item) => (
          <MemoryCard
            key={item.title}
            clickHandler={clickHandler}
            isMatched={matchedCards.includes(item.title)}
            item={item}
            selectedCardLength={selectedCards.length}
          />
        ))}
        {displayedItems.map((item) => (
          <MemoryCard
            key={item.title}
            clickHandler={clickHandler}
            isMatched={matchedCards.includes(item.title)}
            item={item}
            selectedCardLength={selectedCards.length}
          />
        ))}
      </div>
    </GameLayout>
  );
}
