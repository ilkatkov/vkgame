import HeaderLogo from "../components/HeaderLogo";
import { ActivePanel } from "../ClassicIndex";

type Props = {
  go: (panelName: ActivePanel) => void;
  id: string;
  welcomeTitle: string;
  welcomeBody: string;
};

export default function Index({ go, welcomeTitle, welcomeBody }: Props) {
  return (
    <>
      <HeaderLogo />
      <div id="page">
        <section>
          <div id="infoBox">
            <h1>{welcomeTitle}</h1>
            <p>{welcomeBody}</p>
          </div>
          <button className="classic" onClick={() => go("tutorial")}>
            Поехали!
          </button>
        </section>
      </div>
    </>
  );
}
