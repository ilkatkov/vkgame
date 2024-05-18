import bridge from "@vkontakte/vk-bridge";
import { Alert, Button } from "@vkontakte/vkui";
import { AlertActionProps } from "@vkontakte/vkui/dist/components/Alert/AlertAction";

type Props = {
  closePopout: () => void;
  welcomeTitle: string;
  welcomeBody: string;
};

export default function WelcomePopout(props: Props) {
  return (
    <Alert
      onClose={() => {
        props.closePopout();
      }}
      renderAction={renderAction}
      actionsLayout="horizontal"
      actionsAlign="center"
      header={props.welcomeTitle}
      text={props.welcomeBody}
      actions={[
        {
          title: "Выйти",
          mode: "cancel",
          action: closeMiniApp,
        },
        {
          title: "Играть",
          mode: "destructive",
          action: () => props.closePopout(),
        },
      ]}
    />
  );
}

function renderAction({ mode, ...restProps }: AlertActionProps) {
  return (
    <Button
      mode={mode === "cancel" ? "secondary" : "primary"}
      size="m"
      {...restProps}
    />
  );
}

function closeMiniApp() {
  bridge
    .send("VKWebAppClose", {
      status: "success",
      payload: {
        name: "value",
      },
    })
    .catch((e) => {
      console.error(e);
    });
}
