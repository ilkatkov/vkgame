import { FC, useRef, useState } from "react";
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
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import CardsLogo from "../assets/cardslogo.svg";
import "./Home.css";
import { Icon12ChevronRight, Icon16Add } from "@vkontakte/icons";

import Bg1 from "../assets/ (1).png";
import Bg2 from "../assets/ (2).png";
import Bg3 from "../assets/ (3).png";
import Bg4 from "../assets/ (4).png";
import Bg5 from "../assets/ (5).png";
import Bg6 from "../assets/ (6).png";
import Bg7 from "../assets/ (7).png";
import Bg8 from "../assets/ (8).png";
import Bg9 from "../assets/ (9).png";
import Bg10 from "../assets/ (10).png";
const backgrouds = [Bg1, Bg2, Bg3, Bg4, Bg5, Bg6, Bg7, Bg8, Bg9, Bg10];

export interface HomeProps extends NavIdProps {
  go: (panelName: string) => void;
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, go, fetchedUser }) => {
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

  // MARK: backgroud

  const [backgroud, setBackgroud] = useState<string>("background");
  const BackgroundChip: React.FC<{ bg: string }> = ({ bg }) => {
    return (
      <div
        className={
          "backgroundchip" + (backgroud == bg ? " backgroundchip_active" : "")
        }
        onClick={(e) => {
          e.preventDefault();
          setBackgroud(bg);
        }}
      >
        <img src={bg} alt="" />
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
          // setCards([]);
        }}
      >
        {chipGameType}
      </div>
    );
  };

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
            className="welcomeinput"
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
            className="welcomeinput"
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
          {/* MARK: background */}
          <Text className="inputlabel">Выберите фон:</Text>
          <div className="horizontaldiv">
            {backgrouds.map((bg, index) => (
              <BackgroundChip bg={bg} key={index} />
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
          <Text className="inputlabel">Выберите режим игры:</Text>
          <div className="horizontaldiv">
            <GameTypeChip chipGameType="Мэтч-карточки" />
            <GameTypeChip chipGameType="Текстовые карточки" />
          </div>
          <Spacing size={12} />
          {gameType == "Мэтч-карточки" && <>{/* <MatchForm /> */}</>}
          {gameType == "Текстовые карточки" && (
            <>
              <Text>В разработке</Text>
            </>
          )}
          <div className="horizontaldiv toright">
            <div className="continue">
              Продолжить <Icon12ChevronRight color="#0077ff" />
            </div>
          </div>
        </div>
      </Group>
    </Panel>
  );
};
