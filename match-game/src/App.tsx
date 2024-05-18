import { useState, useEffect, ReactNode } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import {
  SplitLayout,
  SplitCol,
  Panel,
  PanelHeader,
  Group,
  Title,
} from "@vkontakte/vkui";
import { backendURL } from "../settings";
import MatchIndex from "./match-cards/Index";
import { GameData } from "./types";
import ClassicIndex from "./classic-cards/ClassicIndex";
import { PopoutContext } from "./PopoutContext";

export const App = () => {
  const popoutState = useState<ReactNode>(null);
  const [, setUser] = useState<UserInfo | undefined>();
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      const gameData = await getGameData(location.hash.slice(1));
      if (gameData?.gameType === "CLASSIC") {
        import("./classic-cards/popup.css");
        import("./classic-cards/style.css");
        import("./classic-cards/components/HeaderLogo.css");
      }
      console.log(gameData);
      setGameData(gameData);
    }
    fetchData();
  }, []);

  if (!location.hash.slice(1) || !gameData) {
    return (
      <SplitLayout>
        <SplitCol>
          <Panel>
            <PanelHeader>Ошибка</PanelHeader>
            <Group>
              <Title>
                ID игры не найден. Используйте действительный QR-код
              </Title>
            </Group>
          </Panel>
        </SplitCol>
      </SplitLayout>
    );
  }

  return (
    <SplitLayout popout={popoutState[0]}>
      <PopoutContext.Provider value={popoutState}>
        <SplitCol>
          {gameData.gameType == "MATCHCARDS" && (
            <MatchIndex gameData={gameData} />
          )}
          {gameData.gameType == "CLASSIC" && (
            <ClassicIndex gameData={gameData} />
          )}
        </SplitCol>
      </PopoutContext.Provider>
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
