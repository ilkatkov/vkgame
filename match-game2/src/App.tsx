import { useState, useEffect } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { SplitLayout, SplitCol } from "@vkontakte/vkui";
import { backendURL } from "../settings";
import MatchIndex from "./match-cards/Index";
import { GameData } from "./types";
import ClassicIndex from "./classic-cards/ClassicIndex";

export const App = () => {
  const [, setUser] = useState<UserInfo | undefined>();
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

  return (
    <SplitLayout>
      {/*popout={popout}*/}
      <SplitCol>
        {gameData?.gameType == "MATCHCARDS" && (
          <MatchIndex gameData={gameData} />
        )}
        {gameData?.gameType == "CLASSIC" && (
          <ClassicIndex gameData={gameData} />
        )}
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
