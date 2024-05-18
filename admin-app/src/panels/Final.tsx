import "./Final.css";

import QRCode from "qrcode";

import { Group, Panel } from "@vkontakte/vkui";

import VKLogo from "../assets/vklogo.svg";
import { useEffect, useRef, useState } from "react";
import bridge from "@vkontakte/vk-bridge";

type FinalProps = {
  id: string;
  createdGameId: number | null;
};

export default function Final(props: FinalProps) {
  const [copyState, setCopyState] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    QRCode.toCanvas(
      canvasRef.current,
      `https://vk.com/app51917371#${props.createdGameId}`,
      (error: unknown) => {
        console.error(error);
      }
    );
  }, [canvasRef, props.createdGameId]);

  return (
    <Panel id={props.id}>
      <Group className="final-wrapper">
        <div className="white-box">
          <img src={VKLogo} alt="VK" />
          <h1 className="final-title">Отлично!</h1>
          <h2 className="final-body">Ваша игра доступна для пользователей</h2>
          <div>
            <a
              className="game-link"
              onClick={(e) => {
                e.preventDefault();
                bridge
                  .send("VKWebAppCopyText", {
                    text: `https://vk.com/app51917371#${props.createdGameId}`,
                  })
                  .then((data) => {
                    if (data.result) {
                      setCopyState(true);
                      setTimeout(() => {
                        setCopyState(false);
                      }, 2000);
                    } else {
                      throw "couldn't copy text to clipboard.";
                    }
                  })
                  .catch((error) => {
                    // Ошибка
                    console.error(error);
                  });
              }}
              href={`https://vk.com/app51917371#${props.createdGameId}`}
            >
              https://vk.com/app51917371#{props.createdGameId}
            </a>
          </div>
          {copyState && <p>скопировано!</p>}
          <div>
            <canvas ref={canvasRef}></canvas>
          </div>
          {/* <Button
            className="final-share"
            stretched={true}
            size="l"
            onClick={(e) => {
              e.preventDefault();
              bridge
                .send("VKWebAppShare", {
                  link: `https://vk.com/app51917371#${props.createdGameId}`,
                })
                .catch((error: unknown) => {
                  // Ошибка
                  console.log(error);
                });
            }}
          >
            Поделиться
          </Button> */}
        </div>
      </Group>
    </Panel>
  );
}
