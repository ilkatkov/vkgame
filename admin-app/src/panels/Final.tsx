import QRCode from "qrcode";

import { Button, Group, Panel } from "@vkontakte/vkui";

import VKLogo from "../assets/vklogo.svg";
import { useEffect, useRef } from "react";

type FinalProps = {
  id: string;
  createdGameId: number | null;
};

export default function Final(props: FinalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    QRCode.toCanvas(
      canvasRef.current,
      `https://vk.com/app51917371#${props.createdGameId}`,
      (error: any) => {
        console.error(error);
      }
    );
  }, [canvasRef]);

  return (
    <Panel id={props.id}>
      <Group
        style={{
          backgroundColor: "#999999",
          paddingBottom: 53,
          minHeight: 1024,
          display: "grid",
          placeItems: "center",
        }}
      >
        <div>
          <img className="" src={VKLogo} alt="VK" />
          <h1>Отлично!</h1>
          <h2>Ваша игра доступна для пользователей</h2>
          <a href={`https://vk.com/app51917371#${props.createdGameId}`}>
            https://vk.com/app51917371#{props.createdGameId}
          </a>
          <canvas ref={canvasRef}></canvas>
          <p>Скачать qr код</p>
          <Button stretched={true}>Поделиться</Button>
        </div>
      </Group>
    </Panel>
  );
}
