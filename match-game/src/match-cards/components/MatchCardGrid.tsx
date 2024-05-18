import { useContext, useEffect, useState } from "react";
import { GameData } from "../../types";
import { Div } from "@vkontakte/vkui";
import MatchCard from "./MatchCard2";
import { doubled, shuffled } from "./utils";
import { CardsContext } from "./CardsContext";
import { PointsContext } from "./PointsContext";
import { PopoutContext } from "../../PopoutContext";
import DescPopout from "./DescPopout";
import { RoundContext } from "../panels/RoundContext";
import "./MatchCardGrid.css";

export type CardState = "hidden" | "revealed" | "matched";

type Props = {
  matchCards: GameData["matchCards"];
  nextRound: () => void;
};

export default function MatchCardGrid(props: Props) {
  const [, round, _] = useContext(RoundContext);
  const [cardsThisRound, points, setPoints] = useContext(PointsContext);
  const [, setPopout] = useContext(PopoutContext);
  const [cards, setCards] = useState<
    ((typeof props.matchCards)[0] & { state: CardState })[]
  >([]);
  const [firstLoad, setLoad] = useState(false);
  _;
  // initialization
  useEffect(() => {
    setLoad(true);
    const newCards: typeof cards = shuffled(
      doubled(
        props.matchCards.map((card) => {
          return { ...card, state: "hidden" };
        })
      )
    );
    setCards(newCards);
    function changeAllCardsState(state: CardState) {
      setCards(
        newCards.map((card) => {
          return {
            ...card,
            state: state,
          };
        })
      );
    }
    setTimeout(() => {
      changeAllCardsState("revealed");
    }, 1000);
    setTimeout(() => {
      changeAllCardsState("hidden");
      setLoad(false);
    }, 2300);
  }, [props.matchCards, round]);

  // game logic
  useEffect(() => {
    if (firstLoad) return;
    const revealedCardsIndices = cards
      .map((card, index) => (card.state == "revealed" ? index : -1))
      .filter((index) => index !== -1);
    if (revealedCardsIndices.length < 2) {
      return;
    }
    const [i1, i2] = revealedCardsIndices;
    if (cards[i1].imageURL != cards[i2].imageURL) {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[i1].state = "hidden";
        newCards[i2].state = "hidden";
        setCards(newCards);
      }, 400);
    } else {
      const newCards = [...cards];
      newCards[i1].state = "matched";
      newCards[i2].state = "matched";
      setCards(newCards);
      const closePopout = () => {
        if (points + 1 === cardsThisRound) {
          props.nextRound();
        } else {
          setPoints(points + 1);
        }
        setPopout(null);
      };
      setPopout(<DescPopout card={newCards[i1]} closePopout={closePopout} />);
    }
  }, [cards, cardsThisRound, firstLoad, points, props, setPoints, setPopout]);

  return (
    <Div className="match-grid">
      <CardsContext.Provider value={[cards, setCards]}>
        {cards.map((_, index) => (
          <MatchCard key={index} index={index} />
        ))}
      </CardsContext.Provider>
    </Div>
  );
}
