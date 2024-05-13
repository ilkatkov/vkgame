import { Headline, Link, Panel, Title } from "@vkontakte/vkui";
import { GameData } from "../../types";

type Props = {
  id: string;
  gameData: GameData | null;
};

const Final: React.FC<Props> = ({ /*fetchedUser,*/ gameData }) => {
  return (
    <Panel id="final">
      {/* Thanks for playing and leave links */}
      <Title>{gameData?.leaveTitle}</Title>
      <Headline>{gameData?.leaveBody}</Headline>
      <Link href={gameData?.leaveURL}>Продолжить</Link>
    </Panel>
  );
};

export default Final;
