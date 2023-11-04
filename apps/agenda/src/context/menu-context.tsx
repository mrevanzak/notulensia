import type {ReactElement} from "react";
import React, {createContext, useState} from "react";
import type {MenuContextProps} from "@/types/types";

export const MenuContext = createContext({} as MenuContextProps);

interface MenuProviderProps {
  children: React.ReactNode;
}

export function MenuProvider(props: MenuProviderProps): ReactElement {
  const [activeMenu, setActiveMenu] = useState("");

  const value = {
    activeMenu,
    setActiveMenu,
  };

  return (
    <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>
  );
}