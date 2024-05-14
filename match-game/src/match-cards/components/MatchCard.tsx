import React, { useState } from "react";

import { Card } from "@vkontakte/vkui";

import "./MatchCard.css";

export type CardState = "hidden" | "revealed" | "matched";

type Props = {
  key: number;
  index: number;
  image: string;
  cardStates: CardState[];
  setCardStates: React.Dispatch<React.SetStateAction<CardState[]>>;
};

const MatchCard: React.FC<Props> = ({
  index,
  image,
  cardStates,
  setCardStates,
}) => {
  const [rerender, setRerender] = useState<boolean>(false);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    const newCardStates = [...cardStates];
    if (newCardStates[index] == "matched") return;
    newCardStates[index] =
      newCardStates[index] === "hidden" ? "revealed" : "hidden";
    setCardStates(newCardStates);
    setRerender(!rerender);
  };

  return (
    <Card className="card-grid__item" mode="shadow" onClick={handleClick}>
      <img
        className={`card-grid__item__img card-grid__item__img--${cardStates[index]}`}
        src={image}
        alt="card"
      />
    </Card>
  );
};

export default MatchCard;
