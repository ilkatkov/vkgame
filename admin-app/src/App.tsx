import React, { useState, useEffect, ReactNode, StrictMode } from "react";
import bridge, { GetLaunchParamsResponse } from "@vkontakte/vk-bridge";
import "@vkontakte/vkui/dist/vkui.css";

import { LaunchContext } from "./LaunchContext";
import MiniAppWrapper from "./MiniAppWrapper";
import { ModalType, PageType } from "./declarations/types";
import { ModalRoot, SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import Welcome from "./modals/Welcome";
import ErrorMessage from "./modals/ErrorMessage";

const App = () => {
  const [initResult, setInitResult] = useState<boolean | undefined>();
  const [launchParams, setLaunchParams] = useState<
    GetLaunchParamsResponse | undefined
  >();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [hidden, setHidden] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<PageType>("creation");

  useEffect(() => {
    let initResult: boolean | undefined;
    async function fetchData() {
      initResult = (await bridge.send("VKWebAppInit")).result;
      setInitResult(initResult);
      setLaunchParams(await bridge.send("VKWebAppGetLaunchParams"));
      // setPopout(null);
    }
    fetchData();
    if (initResult === true) {
      setActiveModal("welcome");
    } else {
      setActiveModal("errormessage");
    }
  }, []);

  const modal = (
    <ModalRoot activeModal={activeModal}>
      <Welcome setActiveModal={setActiveModal} id="welcome" />
      <ErrorMessage id="errormessage" />
    </ModalRoot>
  );

  useEffect(() => {
    if (activeModal == null) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [activeModal]);

  return (
    <StrictMode>
      <MiniAppWrapper>
        <LaunchContext.Provider value={launchParams}>
          <SplitLayout modal={modal}>
            <SplitCol>
              <View activePanel={activePage} hidden={hidden}></View>
            </SplitCol>
          </SplitLayout>
        </LaunchContext.Provider>
      </MiniAppWrapper>
    </StrictMode>
  );
};

export default App;
