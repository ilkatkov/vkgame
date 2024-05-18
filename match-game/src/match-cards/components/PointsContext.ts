import { createContext } from "react";

export const PointsContext = createContext<
  [number, number, React.Dispatch<React.SetStateAction<number>>]
>([
  1,
  1,
  (_) => {
    void _;
  },
]);
