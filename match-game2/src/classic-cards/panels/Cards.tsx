import { useEffect, useState, useRef } from "react";
import HeaderLogo from "../components/HeaderLogo";
import exit from "../img/exit.svg";
import { DescCard, WordCard } from "../components/cards";
import { ActivePanel } from "../ClassicIndex";
import { GameData } from "../../types";

const colors = ["pink", "blue", "violet", "pink", "blue", "violet"];

type Props = {
  go: (panelName: ActivePanel) => void;
  gameData: GameData | null;
  id: string;
};

export default function Cards({ go, gameData }: Props) {
  const [words, setWords] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [pointsEnd, setPointsEnd] = useState(0);
  const [popupActive, setPopupActive] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [points, setPoints] = useState(0);
  const [shuffledValues, setShuffledValues] = useState<string[]>([]);
  const [wordCardsInGame, setWordCardsInGame] = useState<boolean[]>([]);
  const wordCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameData) return;
    const words = gameData.classicCards.map((card) => card.term);
    setWords(words);
    const values = gameData.classicCards.map((card) => card.description);
    setValues(values);
    const pointsEnd = words.length;
    setPointsEnd(pointsEnd);
    setShuffledValues(shuffled(values));
    setWordCardsInGame(Array(pointsEnd).fill(true));
  }, [gameData]);

  return (
    <>
      <HeaderLogo />
      <div id="page">
        <section className="cardsBox">
          <div className="words" ref={wordCardsRef}>
            {words.map((word, index) => (
              <WordCard key={index} word={word} />
            ))}
          </div>
          <div className="cards">
            {shuffledValues.map((value, index) => (
              <DescCard
                key={index}
                color={colors[index]}
                value={value}
                setPopupActive={setPopupActive}
                setPopupText={setPopupText}
                wordCardsRef={wordCardsRef}
                points={points}
                setPoints={setPoints}
                pointsEnd={pointsEnd}
                words={words}
                wordCardsInGame={wordCardsInGame}
                setWordCardsInGame={setWordCardsInGame}
                values={values}
                go={go}
              />
            ))}
          </div>
        </section>
        <div className={`popup__bg ${popupActive ? "active" : ""}`}>
          <form className={`popup ${popupActive ? "active" : ""}`}>
            <img
              src={exit}
              className="close-popup"
              onClick={() => {
                setPopupActive(false);
              }}
            />
            <div id="popupBox">
              <p id="popupText">{popupText}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function shuffled<T>(array: T[]): T[] {
  const copy = [...array];
  return copy.sort(() => Math.random() - 0.5);
}
