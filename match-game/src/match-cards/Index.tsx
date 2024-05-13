import { View } from "@vkontakte/vkui";
import { GameData } from "../types";
import { useState } from "react";
import Game from "./panels/Game";
import Final from "./panels/Final";

type Props = {
  gameData: GameData | null;
};

export type ActivePanel = "game" | "final";

export default function MatchIndex({ gameData }: Props) {
  const [activePanel, setActivePanel] = useState<ActivePanel>("game");

  const go = (panelName: ActivePanel) => {
    setActivePanel(panelName);
  };

  return (
    <View activePanel={activePanel}>
      <Game id="game" go={go} gameData={gameData} />
      <Final id="final" gameData={gameData} />
    </View>
  );
}
