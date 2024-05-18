import { ReactNode, createContext, useState } from "react";

export const PopoutContext = createContext<
  ReturnType<typeof useState<ReactNode>>
>([
  null,
  (_) => {
    void _;
  },
]);
