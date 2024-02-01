import { Icon56LogoVk } from "@vkontakte/icons";
import { Div, Title } from "@vkontakte/vkui";
import React from "react";

const CardsLogo: React.FC<{
  color?: string;
}> = ({ color }) => {
  return (
    <Div className="flex items-center">
      <Icon56LogoVk color={color ?? "black"} />
      <Title level="1">Карточки</Title>
    </Div>
  );
};

export default CardsLogo;
