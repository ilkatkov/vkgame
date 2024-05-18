import { View } from "@vkontakte/vkui";
import { GameData } from "../types";
import { useState } from "react";
import Game from "./panels/Game2";
import Finish from "./panels/Finish";
import { ActivePanelContext } from "./ActivePanelContext";

type Props = {
  gameData: GameData;
};

export type ActivePanel = "game" | "final";

export default function MatchIndex(props: Props) {
  const activePanelState = useState<ActivePanel>("game");

  return (
    <ActivePanelContext.Provider value={activePanelState}>
      <View activePanel={activePanelState[0]}>
        <Game id="game" gameData={props.gameData} />
        <Finish
          id="final"
          leaveTitle={props.gameData.leaveTitle}
          leaveBody={props.gameData.leaveBody}
          leaveURL={props.gameData.leaveURL}
        />
      </View>
    </ActivePanelContext.Provider>
  );
}
