import { Icon16DeleteOutline, Icon20AddCircle } from "@vkontakte/icons";
import React from "react";

import "./cardforms.css";

const ClassicCardForm: React.FC<{
  classicCardsState: [
    {
      term: string;
      description: string;
    }[],
    React.Dispatch<
      React.SetStateAction<
        {
          term: string;
          description: string;
        }[]
      >
    >
  ];
}> = ({ classicCardsState }) => {
  const [cards, setCards] = classicCardsState;

  return (
    <div className="classicform">
      {cards.map((card, index) => (
        <div className="classiccard" key={index}>
          <div className="smalltext">
            <Icon16DeleteOutline
              className="deletecard"
              onClick={() => {
                const newCards = [...cards];
                newCards.splice(index, 1);
                setCards(newCards);
              }}
            />
            <div>Карточка #{index + 1}</div>
          </div>
          <textarea
            cols={30}
            rows={1}
            className="textinput"
            value={card.term}
            onChange={(e) => {
              const newCards = [...cards];
              newCards[index] = {
                ...newCards[index],
                term: e.currentTarget.value,
              };
              setCards(newCards);
            }}
          ></textarea>
          <textarea
            cols={30}
            rows={2}
            className="textinput"
            value={card.description}
            onChange={(e) => {
              const newCards = [...cards];
              newCards[index] = {
                ...newCards[index],
                description: e.currentTarget.value,
              };
              setCards(newCards);
            }}
          ></textarea>
        </div>
      ))}
      <div
        className="addclassic"
        onClick={() => {
          setCards([...cards, { term: "", description: "" }]);
        }}
      >
        <Icon20AddCircle />
      </div>
    </div>
  );
};

export default ClassicCardForm;
