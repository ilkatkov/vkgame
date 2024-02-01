import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
} from "@vkontakte/vkui";
import React from "react";

const MiniAppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>{children}</AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default MiniAppWrapper;
