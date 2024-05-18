type Props = {
  id: string;
  leaveTitle: string;
  leaveBody: string;
  leaveURL: string;
};

export default function Finish(props: Props) {
  return (
    <>
      <div id="page">
        <section>
          <div id="infoBox">
            <h1>{props.leaveTitle}</h1>
            <p>{props.leaveBody}</p>
          </div>
          <a href={props.leaveURL}>
            <button className="classic">Продолжить</button>
          </a>
        </section>
      </div>
    </>
  );
}
