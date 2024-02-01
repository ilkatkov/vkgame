import { createContext } from "react";
import { GetLaunchParamsResponse } from "@vkontakte/vk-bridge";

export const LaunchContext = createContext<GetLaunchParamsResponse | undefined>(
  undefined
);
