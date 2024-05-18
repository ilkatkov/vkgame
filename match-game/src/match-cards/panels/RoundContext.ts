import React, { createContext } from "react";

export const RoundContext = createContext<
  [number, number, React.Dispatch<React.SetStateAction<number>>]
>([
  1,
  1,
  (_) => {
    void _;
  },
]);
