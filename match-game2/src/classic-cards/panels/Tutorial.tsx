import { useEffect } from "react";
import HeaderLogo from "../components/HeaderLogo";
import exit from "../img/exit.svg";
import { ActivePanel } from "../ClassicIndex";
import { GameData } from "../../types";

type Props = {
  go: (panelName: ActivePanel) => void;
  gameData: GameData | null;
  id: string;
};

export default function Tutorial({ go, gameData }: Props) {
  useEffect(() => {
    if (!gameData) return;
    const popupBg = document.querySelector<HTMLDivElement>(".popup__bg");
    const popup = document.querySelector<HTMLFormElement>(".popup");
    const tutorialDescCard =
      document.querySelector<HTMLDivElement>(".tutorialCard");
    const closePopup = document.querySelector<HTMLImageElement>(".close-popup");
    const popupText = document.getElementById("popupText");
    const popupBox = document.getElementById("popupBox");
    const btnNext = document.getElementById("btnNext");

    const words = gameData?.classicCards.map((card) => card.term);
    const wordCards = Array.from(document.getElementsByClassName("wordCard"));

    let tutorial = true;

    for (let i = 0; i < words.length; i++) {
      wordCards[i].innerHTML = words[i];
    }

    if (
      popupBg &&
      popup &&
      tutorialDescCard &&
      closePopup &&
      popupText &&
      popupBox &&
      btnNext
    ) {
      popupText.innerHTML =
        "Нажми на цветную карточку, чтобы увидеть ее описание";

      popupBg.classList.add("active");
      popup.classList.add("active");
      tutorialDescCard.addEventListener("click", () => {
        popupBg.classList.remove("active");
        popup.classList.remove("active");
        tutorialDescCard.classList.remove("glowing");
        tutorialDescCard.classList.remove("tutorialCard");
        setTimeout(function () {
          closePopup.classList.remove("hidden");
          popupText.innerHTML = gameData.classicCards[0].description;
          popupBg.classList.add("active");
          popup.classList.add("active");

          closePopup.onclick = function () {
            popupBg.classList.remove("active");
            popup.classList.remove("active");
            setTimeout(function () {
              tutorialDescCard.classList.add("tutorialCard");
              wordCards[0].classList.add("tutorialCard");
              popupBg.classList.add("active");
              popup.classList.add("active");

              tutorialDescCard.style.position = "absolute";
              const startX = tutorialDescCard.getBoundingClientRect().left;

              function moveDown(startX: number) {
                let coordX = startX;
                let time = setInterval(frame, 5);
                function frame() {
                  if (tutorial && tutorialDescCard && gameData) {
                    if (coordX <= 40) {
                      tutorialDescCard.style.left = startX + "px";
                      coordX = startX;
                      clearInterval(time);
                      tutorialDescCard.classList.add("hidden");
                      wordCards[0].innerHTML = "";
                      setTimeout(function () {
                        wordCards[0].innerHTML = gameData.classicCards[0].term;
                        tutorialDescCard.classList.remove("hidden");
                        time = setInterval(frame, 5);
                      }, 1000);
                    }
                    coordX--;
                    tutorialDescCard.style.left = coordX.toString() + "px";
                  }
                }
              }

              moveDown(startX);
              popupBox.classList.add("popupStart");
              popupText.innerHTML =
                "Соедини определения и термины, наиболее подходящие друг другу";
              popupBg.classList.add("active");
              popup.classList.add("active");

              btnNext.classList.remove("hidden");
              closePopup.classList.add("hidden");
              btnNext.onclick = function () {
                console.log("+");
                tutorial = false;
                tutorialDescCard.style.left = startX + "px";
                tutorialDescCard.style.removeProperty("position");
                popupBg.classList.remove("active");
                popup.classList.remove("active");
                go("cards");
              };
            }, 500);
          };
        }, 500);
      });
    }
  }, [go, gameData]);

  return (
    <>
      <HeaderLogo />
      <div id="page">
        <section className="cardsBox">
          <div className="words">
            <div className="wordCard"></div>
            <div className="wordCard"></div>
            <div className="wordCard"></div>
            <div className="wordCard"></div>
            <div className="wordCard"></div>
            <div className="wordCard"></div>
          </div>
          <div className="cards">
            <div className="descCard pink tutorialCard glowing"></div>
            <div className="descCard blue"></div>
            <div className="descCard violet"></div>
            <div className="descCard pink"></div>
            <div className="descCard blue"></div>
            <div className="descCard violet"></div>
          </div>
        </section>
        <div className="popup__bg">
          <form className="popup">
            <img src={exit} className="close-popup hidden" />
            <div id="popupBox">
              <p id="popupText"></p>
              <button type="button" id="btnNext" className="next hidden">
                Начать
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
