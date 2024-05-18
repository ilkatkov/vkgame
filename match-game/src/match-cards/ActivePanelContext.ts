import React, { createContext } from "react";
import { ActivePanel } from "./Index";

export const ActivePanelContext = createContext<
  [ActivePanel, React.Dispatch<React.SetStateAction<ActivePanel>>]
>([
  "game",
  (_) => {
    void _;
  },
]);
