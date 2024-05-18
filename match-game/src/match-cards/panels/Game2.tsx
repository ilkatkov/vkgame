import {
  Div,
  IconButton,
  Panel,
  PanelHeader,
  PanelHeaderContent,
  Title,
} from "@vkontakte/vkui";
import { GameData } from "../../types";
import HorizontalLogo from "../horizontallogo.svg";
import { useContext, useEffect, useState } from "react";
import WelcomePopout from "../components/WelcomePopout";
import Round from "../components/Round";
import { PopoutContext } from "../../PopoutContext";
import { RoundContext } from "./RoundContext";
import bridge from "@vkontakte/vk-bridge";
import { Icon28ShareOutline } from "@vkontakte/icons";

import "./Game2.css";

type Props = {
  id: string;
  gameData: GameData;
};

export default function Game(props: Props) {
  const roundState: [
    number,
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = [props.gameData.rounds as number, ...useState(1)];
  const [, setPopout] = useContext(PopoutContext);
  const [beginGame, setBeginGame] = useState(false);

  useEffect(() => {
    const closePopout = () => {
      setPopout(null);
      setBeginGame(true);
    };
    setPopout(
      <WelcomePopout
        closePopout={closePopout}
        welcomeTitle={props.gameData.welcomeTitle}
        welcomeBody={props.gameData.welcomeBody}
      />
    );
  }, [props.gameData.welcomeBody, props.gameData.welcomeTitle, setPopout]);

  return (
    <Panel id={props.id}>
      <PanelHeader>
        <PanelHeaderContent className="logo-container">
          <img
            style={{
              display: "block",
            }}
            src={HorizontalLogo}
            alt="VK Карточки"
          />
        </PanelHeaderContent>
      </PanelHeader>
      <Div
        className="matchgame-wrapper"
        style={{
          overflow: "auto",
        }}
      >
        <Title className="rounds-count" level="2">
          {beginGame && (props.gameData?.rounds as number) > 1 && (
            <>Раунд {roundState[1]}</>
          )}
        </Title>
        <RoundContext.Provider value={roundState}>
          {beginGame && <Round matchCards={props.gameData.matchCards} />}
        </RoundContext.Provider>
        <Div>
          <IconButton onClick={shareApp} aria-label="Поделиться">
            <Icon28ShareOutline />
          </IconButton>
        </Div>
      </Div>
    </Panel>
  );
}

function shareApp() {
  bridge
    .send("VKWebAppShare", {
      link: "https://m.vk.com/app51917371" + location.hash,
    })
    .catch((error) => {
      // Ошибка
      console.error(error);
    });
}
