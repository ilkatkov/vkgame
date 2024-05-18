import { useContext } from "react";
import { CardsContext } from "./CardsContext";

import "./MatchCard2.css";

type Props = {
  index: number;
};

export default function MatchCard({ index }: Props) {
  const [cards, setCards] = useContext(CardsContext);

  const card = cards[index];

  function handleClick() {
    if (card.state === "matched") {
      return;
    }
    const newCards = [...cards];
    newCards[index].state = card.state === "hidden" ? "revealed" : "hidden";
    setCards(newCards);
  }

  return (
    <div
      className={`matchimage-wrapper matchimage-wrapper--${card.state}`}
      style={{
        backgroundImage: `url('${card.imageURL}')`,
      }}
    >
      <img
        onClick={handleClick}
        className={`matchimage matchimage--${card.state}`}
        src={card.imageURL}
        alt={card.name}
      />
    </div>
  );
}
