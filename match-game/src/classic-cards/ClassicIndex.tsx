import { View } from "@vkontakte/vkui";
import { useState } from "react";
import Finish from "./panels/Finish";
import { GameData } from "../types";
import Cards from "./panels/Cards";
import Tutorial from "./panels/Tutorial";
import Index from "./panels/Index";

type Props = {
  gameData: GameData | null;
};

export type ActivePanel = "index" | "tutorial" | "cards" | "finish";

export default function ClassicIndex({ gameData }: Props) {
  const [activePanel, setActivePanel] = useState<ActivePanel>("index");

  const go = (panelName: ActivePanel) => {
    setActivePanel(panelName);
  };

  return (
    <View activePanel={activePanel}>
      <Index
        id="index"
        go={go}
        welcomeTitle={gameData?.welcomeTitle ?? ""}
        welcomeBody={gameData?.welcomeBody ?? ""}
      />
      <Tutorial id="tutorial" go={go} gameData={gameData} />
      <Cards id="cards" go={go} gameData={gameData} />
      <Finish
        id="finish"
        leaveTitle={gameData?.leaveTitle ?? ""}
        leaveBody={gameData?.leaveBody ?? ""}
        leaveURL={gameData?.leaveURL ?? ""}
      />
    </View>
  );
}
