import React, { FC, ReactNode, useRef, useState } from "react";
import {
  Panel,
  // Header,
  // Button,
  Group,
  // Cell,
  // Div,
  // Avatar,
  NavIdProps,
  Text,
  Spacing,
  ScreenSpinner,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import CardsLogo from "../assets/cardslogo.svg";
import "./Home.css";
import { Icon12ChevronRight, Icon16Add } from "@vkontakte/icons";

import { backendURL } from "../settings";
import ClassicCardForm from "./forms/ClassicCardForm";
import MatchCardForm from "./forms/MatchCardForm";
import { ActivePanel } from "../App";

export interface HomeProps extends NavIdProps {
  go: (panelName: ActivePanel) => void;
  fetchedUser?: UserInfo;
  gameIdState: [
    number | null,
    React.Dispatch<React.SetStateAction<number | null>>
  ];
  setPopout: React.Dispatch<React.SetStateAction<ReactNode>>;
  id: string;
}

export const Home: FC<HomeProps> = ({
  id,
  go,
  fetchedUser,
  gameIdState,
  setPopout,
}) => {
  // MARK: logos

  const [selectedLogo, setSelectedLogo] = useState<string | File>("");
  const [logos, setLogos] = useState<(string | null)[]>([
    "https://corp.vkcdn.ru/media/projects/logos/projects-logo-1.svg",
    "https://corp.vkcdn.ru/media/projects/logos/vk-clips-v2.png",
    null,
  ]);
  const LogoChip: React.FC<{ image: string | null }> = ({ image }) => {
    return image ? (
      <div
        className={`logochip ${image == selectedLogo ? "logochip_active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setSelectedLogo(image);
        }}
      >
        <img src={image} />
      </div>
    ) : null;
  };
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [uploadedLogo, setUploadedLogo] = useState<File | null>();

  // MARK: welcome

  const [welcomeTitle, setWelcomeTitle] = useState<string>("");
  const [welcomeBody, setWelcomeBody] = useState<string>("");

  // MARK: leave

  const [leaveTitle, setLeaveTitle] = useState<string>("");
  const [leaveBody, setLeaveBody] = useState<string>("");
  const [leaveURL, setLeaveURL] = useState<string>("");

  // MARK: background

  const [background, setBackground] = useState<number | null>(null);
  const BackgroundChip: React.FC<{ bgURL: string; bg: number }> = ({
    bg,
    bgURL,
  }) => {
    return (
      <div
        className={
          "backgroundchip" + (background == bg ? " backgroundchip_active" : "")
        }
        onClick={(e) => {
          e.preventDefault();
          setBackground(bg);
          console.log(bg);
        }}
      >
        <img src={bgURL} alt="" />
      </div>
    );
  };

  // MARK: subject

  const [subject, setSubject] = useState<string | null>(null);
  const SubjectChip: React.FC<{ chipSubject: string }> = ({ chipSubject }) => {
    return (
      <div
        className={
          "selectchip" + (chipSubject == subject ? " selectchip_active" : "")
        }
        onClick={() => {
          setSubject(subject == chipSubject ? null : chipSubject);
        }}
      >
        {chipSubject}
      </div>
    );
  };

  // MARK: gametype

  const [gameType, setGameType] = useState<string | null>("Мэтч-карточки");
  const GameTypeChip: React.FC<{ chipGameType: string }> = ({
    chipGameType,
  }) => {
    return (
      <div
        className={
          "selectchip" + (chipGameType == gameType ? " selectchip_active" : "")
        }
        onClick={() => {
          setGameType(gameType == chipGameType ? null : chipGameType);
        }}
      >
        {chipGameType}
      </div>
    );
  };

  // MARK: classic cards

  const classicCardsState = useState<
    {
      term: string;
      description: string;
    }[]
  >([]);

  // MARK: match cards

  const [rounds, setRounds] = useState<number>(1);
  const RoundChip: React.FC<{ chipRounds: number }> = ({ chipRounds }) => {
    return (
      <div
        className={
          "selectchip" + (chipRounds == rounds ? " selectchip_active" : "")
        }
        onClick={() => {
          setRounds(rounds == chipRounds ? 1 : chipRounds);
          // setCards([]);
        }}
      >
        {chipRounds}
      </div>
    );
  };

  const matchCardsState = useState<
    {
      image: File | null;
      name: string;
      description: string;
    }[]
  >([]);

  return (
    <Panel id={id}>
      <Group
        style={{
          backgroundColor: "white",
          paddingBottom: 53,
        }}
      >
        <img className="cardslogo" src={CardsLogo} alt="VK Карточки" />
        <div className="formwrapper">
          {/* MARK: logos */}
          <Text className="inputlabel">Выберите логотип:</Text>
          <div className="horizontaldiv">
            {logos.map((image, index) => (
              <LogoChip image={image} key={index} />
            ))}
            <div
              className="addlogochip"
              onClick={(e) => {
                e.preventDefault();
                logoInputRef.current?.click();
              }}
            >
              <Icon16Add color="white" />
              Добавить свой логотип
            </div>
            <input
              type="file"
              multiple={false}
              ref={logoInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.currentTarget.files) {
                  const file = e.currentTarget.files[0];
                  if (!file.type.startsWith("image/")) {
                    return;
                  }
                  setUploadedLogo(file);
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const newLogos = [...logos];
                    newLogos[2] = e.target?.result?.toString() ?? null;
                    // console.log(e.target?.result);
                    setLogos(newLogos);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
          <Spacing size={12} />
          {/* MARK: welcome */}
          <Text className="inputlabel">Приветственное сообщение:</Text>
          <textarea
            className="textinput"
            cols={50}
            rows={1}
            maxLength={45}
            placeholder="Заголовок"
            value={welcomeTitle}
            onChange={(e) => {
              setWelcomeTitle(e.currentTarget.value);
            }}
          ></textarea>
          <Spacing size={10} />
          <textarea
            className="textinput"
            cols={50}
            rows={2}
            maxLength={95}
            placeholder="Тело"
            value={welcomeBody}
            onChange={(e) => {
              setWelcomeBody(e.currentTarget.value);
            }}
          ></textarea>
          <Spacing size={12} />
          {/* MARK: leave */}
          <Text className="inputlabel">Сообщение по завершении игры:</Text>
          <textarea
            className="textinput"
            cols={50}
            rows={1}
            maxLength={45}
            placeholder="Заголовок"
            value={leaveTitle}
            onChange={(e) => {
              setLeaveTitle(e.currentTarget.value);
            }}
          ></textarea>
          <Spacing size={10} />
          <textarea
            className="textinput"
            cols={50}
            rows={2}
            maxLength={95}
            placeholder="Тело"
            value={leaveBody}
            onChange={(e) => {
              setLeaveBody(e.currentTarget.value);
            }}
          ></textarea>
          <Spacing size={10} />
          <textarea
            className="textinput"
            cols={50}
            rows={1}
            maxLength={45}
            placeholder="Ссылка (на сообщество, сайт, приложение и т.п.)"
            value={leaveURL}
            onChange={(e) => {
              setLeaveURL(e.currentTarget.value);
            }}
          ></textarea>
          <Spacing size={12} />
          {/* MARK: background */}
          <Text className="inputlabel">Выберите фон:</Text>
          <div className="horizontaldiv">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bg, index) => (
              <BackgroundChip
                bg={index + 1}
                bgURL={`${backendURL}/images/${bg}.png`}
                key={index}
              />
            ))}
          </div>
          <Spacing size={12} />
          {/* MARK: subject */}
          <Text className="inputlabel">Выберите тему:</Text>
          <div className="horizontaldiv">
            <SubjectChip chipSubject="Мемы" />
            <SubjectChip chipSubject="Животные" />
            <SubjectChip chipSubject="Погода" />
            <SubjectChip chipSubject="Театр" />
            <SubjectChip chipSubject="Музыка" />
          </div>
          <Spacing size={12} />
          {/* MARK: gametype */}
          <Text className="inputlabel">Выберите режим игры:</Text>
          <div className="horizontaldiv">
            <GameTypeChip chipGameType="CLASSIC" />
            <GameTypeChip chipGameType="MATCHCARDS" />
          </div>
          <Spacing size={12} />
          {gameType == "CLASSIC" && (
            <>
              <ClassicCardForm classicCardsState={classicCardsState} />
            </>
          )}
          {gameType == "MATCHCARDS" && (
            <>
              <Text className="inputlabel">Выберите количество раундов:</Text>
              <div className="horizontaldiv">
                <RoundChip chipRounds={1} />
                <RoundChip chipRounds={2} />
                <RoundChip chipRounds={3} />
              </div>
              <Spacing size={12} />
              <MatchCardForm matchCardsState={matchCardsState} />
            </>
          )}
          <Spacing size={24} />
          <div className="horizontaldiv toright">
            <div
              className="continue"
              onClick={(e) => {
                e.preventDefault();
                setPopout(<ScreenSpinner size="large" />);
                if (fetchedUser && "id" in fetchedUser) {
                  fetch(`${backendURL}/game`, {
                    method: "POST",
                    mode: "cors",
                    headers: new Headers({
                      "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({
                      ownerId: fetchedUser.id,
                      logoURL: "foo", // TODO
                      background: background,
                      welcomeTitle: welcomeTitle,
                      welcomeBody: welcomeBody,
                      subject: subject,
                      leaveTitle: leaveTitle,
                      leaveBody: leaveBody,
                      leaveURL: leaveURL,
                      gameType: gameType,
                      classicCards: classicCardsState[0],
                      rounds: rounds,
                      matchCards: matchCardsState[0].map((card) => {
                        return {
                          name: card.name,
                          description: card.description,
                          imageURL: "foo", // TODO
                        };
                      }),
                    }),
                  })
                    .then((res) => {
                      if (res.ok) return res.json();
                    })
                    .then((json) => {
                      console.log(json);
                      if (gameType == "MATCHCARDS") {
                        console.log("sending images");
                        const promises: Promise<unknown>[] = [];
                        matchCardsState[0].forEach((card, index) => {
                          console.log("sending img #", index);
                          console.log(card);
                          if (!card.image) {
                            console.error("no file found for:");
                            console.table(card);
                            return;
                          }
                          const data = new FormData();
                          data.append("file", card.image);
                          promises.push(
                            fetch(
                              `${backendURL}/matchcard/${json.matchCards[index].id}/imageURL`,
                              {
                                method: "PUT",
                                mode: "cors",
                                body: data,
                              }
                            )
                          );
                        });
                        Promise.allSettled(promises).then(() => {
                          console.log("all images uploaded");
                        });
                      }
                      gameIdState[1](json.id);
                      setPopout(null);
                      go("final");
                    });
                }
              }}
            >
              Продолжить <Icon12ChevronRight color="#0077ff" />
            </div>
          </div>
        </div>
      </Group>
    </Panel>
  );
};
