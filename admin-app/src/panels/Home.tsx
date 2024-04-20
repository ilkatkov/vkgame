import { FC, useState } from "react";
import {
  Panel,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
  Text,
  Spacing,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import CardsLogo from "../assets/cardslogo.svg";
import "./Home.css";

export interface HomeProps extends NavIdProps {
  go: (panelName: string) => void;
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, go, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };

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
          setCards([]);
        }}
      >
        {chipGameType}
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cards, setCards] = useState<any>([]);
  const MatchForm: React.FC = () => {
    return null;
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
          <Text className="inputlabel">Выберите логотип:</Text>
          <Text>В разработке</Text>
          <Spacing size={12} />
          <Text className="inputlabel">Приветственное сообщение:</Text>
          <textarea
            className="welcomeinput"
            cols={50}
            rows={1}
            maxLength={45}
            placeholder="Заголовок"
          ></textarea>
          <Spacing size={10} />
          <textarea
            className="welcomeinput"
            cols={50}
            rows={2}
            maxLength={95}
            placeholder="Тело"
          ></textarea>
          <Spacing size={12} />
          <Text className="inputlabel">Выберите фон:</Text>
          <Text>На согласовании</Text>
          <Spacing size={12} />
          <Text className="inputlabel">Выберите тему:</Text>
          <div className="horizontaldiv">
            <SubjectChip chipSubject="Мемы" />
            <SubjectChip chipSubject="Животные" />
            <SubjectChip chipSubject="Погода" />
            <SubjectChip chipSubject="Театр" />
            <SubjectChip chipSubject="Музыка" />

            {/* <Icon24Add width={16} height={16} /> Добавить свою тему */}
          </div>
          <Spacing size={12} />
          <Text className="inputlabel">Выберите режим игры:</Text>
          <div className="horizontaldiv">
            <GameTypeChip chipGameType="Мэтч-карточки" />
            <GameTypeChip chipGameType="Текстовые карточки" />
          </div>
          <Spacing size={12} />
          {gameType == "Мэтч-карточки" && (
            <>
              <MatchForm />
            </>
          )}
          {gameType == "Текстовые карточки" && (
            <>
              <Text>В разработке</Text>
            </>
          )}
        </div>
      </Group>

      {fetchedUser && (
        <Group
          header={
            <Header mode="secondary">User Data Fetched with VK Bridge</Header>
          }
        >
          <Cell
            before={photo_200 && <Avatar src={photo_200} />}
            subtitle={city?.title}
          >
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={() => go("persik")}
          >
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
