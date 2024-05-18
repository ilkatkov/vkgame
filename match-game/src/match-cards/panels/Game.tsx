import { Icon28ShareOutline } from "@vkontakte/icons";
import {
  CardGrid,
  Div,
  IconButton,
  Panel,
  PanelHeader,
  Title,
} from "@vkontakte/vkui";
import React, { ReactNode, useEffect } from "react";

import "./Game.css";
import { ActivePanel } from "../Index";
import { GameData } from "../../types";
import MatchCard, { CardState } from "../components/MatchCard";
import { doubleArray, shuffleArray } from "../../utils";
import HorizonalLogo from "../horizontallogo.svg";
import bridge from "@vkontakte/vk-bridge";

type Props = {
  id: string;
  go: (panelName: ActivePanel) => void;
  gameData: GameData | null;
  setPopout: React.Dispatch<React.SetStateAction<ReactNode>>;
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
      <PanelHeader>
        <img src={HorizonalLogo} alt="VK Карточки" />
      </PanelHeader>
      <Title className="game__theme">Тема: {gameData?.subject}</Title>
      <Div className="game__content">
        <CardGrid
          className="card-grid"
          size="s"
          style={{
            marginTop: "40px",
          }}
        >
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
      <Div className="game__footer">
        <IconButton
          onClick={() => {
            bridge
              .send("VKWebAppShare", {
                link: "https://m.vk.com/app51917371" + location.hash,
              })
              .catch((error) => {
                // Ошибка
                console.error(error);
              });
          }}
        >
          <Icon28ShareOutline />
        </IconButton>
      </Div>
    </Panel>
  );
};

export default Game;
