import React, { createContext } from "react";
import { GameData } from "../../types";
import { CardState } from "./MatchCard";

type CardsAlias = (GameData["matchCards"][0] & { state: CardState })[];

export const CardsContext = createContext<
  [CardsAlias, React.Dispatch<React.SetStateAction<CardsAlias>>]
>([[], (_) => void _]);
