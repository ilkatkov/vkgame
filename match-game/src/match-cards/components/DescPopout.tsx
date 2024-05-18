import { Alert, Image } from "@vkontakte/vkui";
import { CardState } from "./MatchCard";

type Props = {
  card: {
    imageURL: string;
    name: string;
    description: string;
    state: CardState;
  };
  closePopout: () => void;
};

export default function DescPopout(props: Props) {
  return (
    <Alert
      onClose={props.closePopout}
      header={props.card.name}
      text={props.card.description}
    >
      <Image src={props.card.imageURL} alt="" />
    </Alert>
  );
}
