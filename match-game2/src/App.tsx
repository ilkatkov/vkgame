import { useState, useEffect } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { View, SplitLayout, SplitCol } from "@vkontakte/vkui";
import Game from "./panels/Game";
import Final from "./panels/Final";
import { backendURL } from "../settings";
import { ActivePanel, GameData } from "./types";

export const App = () => {
  const [activePanel, setActivePanel] = useState<ActivePanel>("game");
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      // setPopout(null);
      const gameData = await getGameData(location.hash.slice(1));
      console.log(gameData);
      setGameData(gameData);
    }
    fetchData();
  }, []);

  const go = (panelName: typeof activePanel) => {
    setActivePanel(panelName);
  };

  return (
    <SplitLayout>
      {/*popout={popout}*/}
      <SplitCol>
        <View activePanel={activePanel}>
          <Game id="game" go={go} gameData={gameData} />
          <Final id="final" fetchedUser={fetchedUser} gameData={gameData} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

async function getGameData(gameId: string) {
  const response = await fetch(backendURL + "game/" + gameId);
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as GameData;
}
