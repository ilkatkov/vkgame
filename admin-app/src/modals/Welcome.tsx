import { Button, ModalCard } from "@vkontakte/vkui";
import { ModalType } from "../declarations/types";

const Welcome: React.FC<{
  id: string;
  setActiveModal: React.Dispatch<React.SetStateAction<ModalType>>;
}> = ({ id, setActiveModal }) => {
  return (
    <ModalCard
      id={id}
      header="Добро пожаловать в VK Карточки!"
      subheader="Создайте собтвенную игру"
      actions={
        <Button
          size="l"
          mode="primary"
          stretched
          onClick={() => setActiveModal(null)}
        >
          Начать
        </Button>
      }
    />
  );
};

export default Welcome;
