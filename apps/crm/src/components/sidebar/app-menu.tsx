import type { ReactElement } from "react";
import type { MenuModel } from "@/types/types";
import AppSubMenu from "./app-sub-menu";

function AppMenu(): ReactElement {
  const model: MenuModel[] = [
    {
      label: "root",
      items: [
        {
          label: "Home",
          to: "/",
        },
        {
          label: "Events",
          to: "/events",
        },
        {
          label: "Calendar",
          to: "/calendar",
        },
        {
          label: "Settings",
          to: "/settings",
        },
        {
          label: "Help",
          to: "/help",
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
}

export default AppMenu;
