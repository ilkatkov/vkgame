import { Button, ModalCard } from "@vkontakte/vkui";

const ErrorMessage: React.FC<{ id: string }> = ({ id }) => {
  return (
    <ModalCard
      id={id}
      header="Произошла ошибка :("
      subheader="Заметка для разработчика: проверьте, что приложение запущено внутри ВКонтакте."
      actions={
        <Button
          size="l"
          mode="primary"
          stretched
          onClick={() => window.location.reload()}
        >
          Обновить
        </Button>
      }
    />
  );
};

export default ErrorMessage;
