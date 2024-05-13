import { Panel } from "@vkontakte/vkui";

type Props = {
  id: string;
  leaveTitle: string;
  leaveBody: string;
  leaveURL: string;
};

export default function Finish(props: Props) {
  return (
    <Panel id={props.id}>
      <div id="page">
        <section>
          <div id="infoBox">
            <h1>{props.leaveTitle}</h1>
            <p>{props.leaveBody}</p>
          </div>
          <a href={props.leaveURL}>
            <button>Продолжить</button>
          </a>
        </section>
      </div>
    </Panel>
  );
}
