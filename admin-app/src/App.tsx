import { useState, useEffect, ReactNode } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { View, SplitLayout, SplitCol, ScreenSpinner } from "@vkontakte/vkui";

import { Persik, Home } from "./panels";
import { backendURL } from "./settings";

export const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(
    <ScreenSpinner size="large" />
  );

  const [createdGameId, setGameId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
      const res = await fetch(`${backendURL}/user/${user.id}`, {
        mode: "cors",
        method: "POST",
      });
      const json = await res.json();
      console.log("user registation:", json);
    }
    fetchData();
  }, []);

  const go = (panelName: string) => {
    setActivePanel(panelName);
  };

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home
            id="home"
            fetchedUser={fetchedUser}
            go={go}
            setGameId={setGameId}
          />
          <Persik id="persik" go={go} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
