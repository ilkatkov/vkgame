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
import { ActivePanel } from "../Index";
import { GameData } from "../../types";
import MatchCard, { CardState } from "../components/MatchCard";
import { doubleArray, shuffleArray } from "../../utils";

type Props = {
  id: string;
  go: (panelName: ActivePanel) => void;
  gameData: GameData | null;
};

const Game: React.FC<Props> = ({ go, gameData }) => {
  const [images, setImages] = React.useState<string[]>([]);
  const [cardStates, setCardStates] = React.useState<CardState[]>([]);
  const [cardsLeft, setCardsLeft] = React.useState<number>(-1);

  // before initial render
  useEffect(() => {
    if (!gameData) return;
    const newImages = gameData.matchCards.map((card) => card.imageURL);
    doubleArray(newImages);
    shuffleArray(newImages);
    setImages(newImages);
    setCardStates(newImages.map(() => "hidden"));
    setTimeout(() => {
      setCardStates(newImages.map(() => "revealed"));
    }, 1000);
    setTimeout(() => {
      setCardStates(newImages.map(() => "hidden"));
    }, 2300);
    setCardsLeft(newImages.length);
  }, [gameData]);

  // handle game logic
  useEffect(() => {
    const flippedCardsIndices = cardStates
      .map((cardState, index) => (cardState === "revealed" ? index : -1))
      .filter((index) => index !== -1);
    if (flippedCardsIndices.length === 2) {
      if (images[flippedCardsIndices[0]] === images[flippedCardsIndices[1]]) {
        const newCardStates = [...cardStates];
        newCardStates[flippedCardsIndices[0]] = "matched";
        newCardStates[flippedCardsIndices[1]] = "matched";
        setCardStates(newCardStates);
        if (cardsLeft === 2) {
          setTimeout(() => {
            go("final");
          }, 200);
        }
        setCardsLeft(cardsLeft - 2);
      } else {
        setTimeout(() => {
          const newCardStates = [...cardStates];
          newCardStates[flippedCardsIndices[0]] = "hidden";
          newCardStates[flippedCardsIndices[1]] = "hidden";
          setCardStates(newCardStates);
        }, 400);
      }
    }
    console.log("cards left: ", cardsLeft);
  }, [cardStates, cardsLeft, go, images]);

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
      <Title className="game__theme">Тема: {gameData?.subject}</Title>
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
