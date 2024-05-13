import React, { useState, useRef } from "react";
import ok from "../img/ok.svg";
import { ActivePanel } from "../ClassicIndex";

type WordCardProps = {
  word: string;
};

export function WordCard({ word }: WordCardProps) {
  return <div className="wordCard">{word}</div>;
}

type DescCardProps = {
  color: string;
  value: string;
  setPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupText: React.Dispatch<React.SetStateAction<string>>;
  wordCardsRef: React.RefObject<HTMLDivElement>;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  pointsEnd: number;
  words: string[];
  wordCardsInGame: boolean[];
  setWordCardsInGame: React.Dispatch<React.SetStateAction<boolean[]>>;
  values: string[];
  go: (panelName: ActivePanel) => void;
};

export function DescCard({
  color,
  value,
  setPopupActive,
  setPopupText,
  wordCardsRef,
  points,
  setPoints,
  pointsEnd,
  words,
  wordCardsInGame,
  setWordCardsInGame,
  values,
  go,
}: DescCardProps) {
  const descCardRef = useRef<HTMLDivElement>(null);
  const [rerender, setRerender] = useState(false);

  return (
    <div
      className={`descCard ${color}`}
      ref={descCardRef}
      onClick={() => {
        console.log("in descCard onClick");
        setPopupActive(true);
        setPopupText(value);
      }}
      onTouchMove={(e) => {
        const touchLocation = e.targetTouches[0];
        const card = descCardRef.current;
        if (!card) return;
        console.log("touchLocation: ", touchLocation);
        console.log("card: ", card);
        if (
          touchLocation.pageX < window.innerWidth - card.offsetWidth / 2 &&
          touchLocation.pageY < window.innerHeight - card.offsetHeight / 2
        ) {
          card.style.position = "absolute";
          card.style.left = touchLocation.pageX - card.offsetWidth / 2 + "px";
          card.style.top = touchLocation.pageY - card.offsetHeight / 2 + "px";
          setRerender(!rerender);
        }
      }}
      onTouchEnd={() => {
        if (!wordCardsRef.current) return;
        const wordCards = Array.from(wordCardsRef.current.children);
        const descCard = descCardRef.current;
        if (!descCard) return;
        console.log("wordCards: ", wordCards);
        wordCards.forEach((wordCard, index) => {
          console.log("wordCard: ", wordCard);
          const descRect = descCard.getBoundingClientRect();
          const wordRect = wordCard.getBoundingClientRect();
          if (
            descRect.bottom > wordRect.top &&
            descRect.right > wordRect.left &&
            descRect.top < wordRect.bottom &&
            descRect.left < wordRect.right
          ) {
            console.log("in if body");
            console.log("descCard.value: ", value);
            console.log("wordCard.value: ", words[index]);
            console.log("wordCard.inGame: ", wordCardsInGame[index]);
            if (wordCardsInGame[index]) {
              if (value == values[index]) {
                descCard.style.display = "none";
                wordCard.innerHTML = `<img src="${ok}" alt="ok" />`;
                setWordCardsInGame(
                  wordCardsInGame.map((item, i) => {
                    if (i === index) {
                      return false;
                    } else {
                      return item;
                    }
                  })
                );
                if (points + 1 === pointsEnd) {
                  go("finish");
                }
                setPoints(points + 1);
              } else {
                setPopupText("Упс, попробуй другую карточку");
                setPopupActive(true);
              }
            }
          }
        });
        descCard.style.removeProperty("position");
        descCard.style.removeProperty("left");
        descCard.style.removeProperty("top");
      }}
    ></div>
  );
}
