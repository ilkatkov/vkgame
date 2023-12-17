import { Icon28MenuOutline, Icon28ShareOutline } from "@vkontakte/icons";
import {
  CardGrid,
  Div,
  IconButton,
  Panel,
  PanelHeader,
  Title,
} from "@vkontakte/vkui";
import React, { useEffect } from "react";

import "./Game.css";
import { doubleArray, shuffleArray } from "../utils";
import { ActivePanel, CardState } from "../common";
import MatchCard from "../components/MatchCard";

type Props = {
  id: string;
  setActivePanel: React.Dispatch<React.SetStateAction<ActivePanel>>;
};

const Game: React.FC<Props> = ({ setActivePanel }) => {
  const [images, setImages] = React.useState<string[]>([]);
  const [cardStates, setCardStates] = React.useState<CardState[]>([]);
  const [cardsLeft, setCardsLeft] = React.useState<number>(-1);

  // before initial render
  useEffect(() => {
    let newImages = fetchImages();
    doubleArray(newImages);
    shuffleArray(newImages);
    setImages(newImages);
    setCardStates(newImages.map((image) => "hidden"));
    setCardsLeft(newImages.length);
  }, []);

  // handle game logic
  useEffect(() => {
    let flippedCardsIndices = cardStates
      .map((cardState, index) => cardState === "revealed" ? index : -1)
      .filter((index) => index !== -1);
    if (flippedCardsIndices.length === 2) {
      if (images[flippedCardsIndices[0]] === images[flippedCardsIndices[1]]) {
        let newCardStates = [...cardStates];
        newCardStates[flippedCardsIndices[0]] = "matched";
        newCardStates[flippedCardsIndices[1]] = "matched";
        setCardStates(newCardStates);
        if (cardsLeft === 2) {
          setActivePanel('final');
        }
        setCardsLeft(cardsLeft - 2);
      } else {
        setTimeout(() => {
          let newCardStates = [...cardStates];
          newCardStates[flippedCardsIndices[0]] = "hidden";
          newCardStates[flippedCardsIndices[1]] = "hidden";
          setCardStates(newCardStates);
        }, 400);
      }
    }
    console.log('cards left: ', cardsLeft);
  }, [cardStates]);

  return (
    <Panel className="game">
      <PanelHeader>Найди пару</PanelHeader>
      <Div className="game__content">
        <CardGrid className="card-grid" size="s">
          {images.map((image, index) => (
            <MatchCard
              key={index}
              index={index}
              image={image}
              cardStates={cardStates}
              setCardStates={setCardStates}
            />
          ))}
        </CardGrid>
      </Div>
      <Title className="game__theme">Тема: найди пару</Title>
      <Div className="game__footer">
        <IconButton>
          <Icon28MenuOutline />
        </IconButton>
        <IconButton>
          <Icon28ShareOutline />
        </IconButton>
      </Div>
    </Panel>
  );
};

export default Game;

const fetchImages = () => {
  // const response = await fetch("https://<URL>");
  // debugger;
  // if (response.ok) {
  //   const json = await response.json();
  //   images = json.images;
  // } else {
  return [
    "https://akademiarechi.ru/wp-content/uploads/2020/08/0bdd462fe4-e1597658368461.jpg",
    "https://avatars.mds.yandex.net/get-games/3006389/2a0000017d6159e953a1ca0f8267b591a6b5/orig",
    "https://www.igrotime.ru/upload/t/800-700im/albums/7944/11696856-3.jpg",
  ];
  // }
};
