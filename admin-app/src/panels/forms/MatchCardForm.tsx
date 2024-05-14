import React, { useEffect, useRef, useState } from "react";

import "./cardforms.css";
import {
  Icon16DeleteOutline,
  Icon20AddCircle,
  Icon28PicturePlusOutline,
} from "@vkontakte/icons";

const MatchImage: React.FC<{
  image: File | null;
  matchCardsState: [
    {
      image: File | null;
      name: string;
      description: string;
    }[],
    React.Dispatch<
      React.SetStateAction<
        {
          image: File | null;
          name: string;
          description: string;
        }[]
      >
    >
  ];
  index: number;
}> = ({ image, matchCardsState, index }) => {
  const [cards, setCards] = matchCardsState;
  const [imageSrc, setSrc] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSrc(e.target?.result?.toString() ?? null);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <div
      className="matchimage"
      onClick={() => {
        imageInputRef.current?.click();
      }}
    >
      {image && imageSrc && <img src={imageSrc} alt="" />}
      <Icon28PicturePlusOutline />
      <input
        type="file"
        multiple={false}
        ref={imageInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            const newCards = [...cards];
            newCards[index] = {
              ...cards[index],
              image: file,
            };
            setCards(newCards);
          }
        }}
      />
    </div>
  );
};

const MatchCardForm: React.FC<{
  matchCardsState: [
    {
      image: File | null;
      name: string;
      description: string;
    }[],
    React.Dispatch<
      React.SetStateAction<
        {
          image: File | null;
          name: string;
          description: string;
        }[]
      >
    >
  ];
}> = ({ matchCardsState }) => {
  const [cards, setCards] = matchCardsState;

  return (
    <div className="matchform">
      {cards.map((card, index) => (
        <div className="matchcard" key={index}>
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
            value={card.name}
            onChange={(e) => {
              const newCards = [...cards];
              newCards[index] = {
                ...newCards[index],
                name: e.currentTarget.value,
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
          <MatchImage
            image={card.image}
            matchCardsState={matchCardsState}
            index={index}
          />
        </div>
      ))}
      <div
        className="addmatch"
        onClick={() => {
          setCards([...cards, { name: "", description: "", image: null }]);
        }}
      >
        <Icon20AddCircle />
      </div>
    </div>
  );
};

export default MatchCardForm;
