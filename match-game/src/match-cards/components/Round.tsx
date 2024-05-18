import { useContext, useState } from "react";
import { RoundContext } from "../panels/RoundContext";
import { GameData } from "../../types";
import { Button, Div } from "@vkontakte/vkui";
import { ActivePanelContext } from "../ActivePanelContext";
import { PointsContext } from "./PointsContext";
import MatchCardGrid from "./MatchCardGrid";

import "./Round.css";

type Props = {
  matchCards: GameData["matchCards"];
};

export default function Round(props: Props) {
  const [, setActivePanel] = useContext(ActivePanelContext);
  const [totalRounds, round, setRound] = useContext(RoundContext);
  const pointsState = useState<number>(0);
  const [cardsThisRound, setCardsThisRound] = useState<number>(
    round == 1 ? 4 : round == 2 ? 6 : 8
  );
  const [relevantCards, setRelevantCards] = useState<typeof props.matchCards>(
    props.matchCards.slice(0, cardsThisRound)
  );

  function replay() {
    setRound(1);
    pointsState[1](0);
    setCardsThisRound(4);
    setRelevantCards(props.matchCards.slice(0, 4));
  }

  function nextRound() {
    if (round === totalRounds) {
      setActivePanel("final");
    } else {
      const newRound = round + 1;
      setRound(newRound);
      pointsState[1](0);
      const newCardsThisRound = newRound == 1 ? 4 : newRound == 2 ? 6 : 8;
      setCardsThisRound(newCardsThisRound);
      setRelevantCards(props.matchCards.slice(0, newCardsThisRound));
    }
  }

  return (
    <Div>
      <Div className="round-buttons">
        <Button
          id="black-round-button"
          size="s"
          mode="secondary"
          onClick={replay}
        >
          Заново
        </Button>
        <Button size="s" mode="outline">
          Баллы: {pointsState[0]}/{cardsThisRound}
        </Button>
      </Div>
      <PointsContext.Provider value={[cardsThisRound, ...pointsState]}>
        <MatchCardGrid matchCards={relevantCards} nextRound={nextRound} />
      </PointsContext.Provider>
    </Div>
  );
}
