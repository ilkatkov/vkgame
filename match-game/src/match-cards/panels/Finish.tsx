import "./Finish.css";

type Props = {
  id: string;
  leaveTitle: string;
  leaveBody: string;
  leaveURL: string;
};

export default function Finish(props: Props) {
  import("../../classic-cards/style.css");
  import("../../classic-cards/popup.css");
  import("../../classic-cards/components/HeaderLogo.css");

  return (
    <div
      id={props.id}
      style={{
        padding: "0 !important",
      }}
    >
      <div id="page">
        <section>
          <div id="infoBox">
            <h1>{props.leaveTitle}</h1>
            <p>{props.leaveBody}</p>
          </div>
          <a href={props.leaveURL}>
            <button className="finish">Продолжить</button>
          </a>
        </section>
      </div>
    </div>
  );
}
