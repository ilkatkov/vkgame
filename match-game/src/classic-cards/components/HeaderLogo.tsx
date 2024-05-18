import logo from "../img/logo.svg";

export default function HeaderLogo() {
  return (
    <header>
      <div className="logoDiv">
        <img id="vkLogo" src={logo} />
        <p>Карточки</p>
      </div>
      <p>проект Сириус.Лето</p>
    </header>
  );
}
