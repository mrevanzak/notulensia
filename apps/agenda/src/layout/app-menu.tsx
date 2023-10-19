import type { ReactElement } from "react";
import type { MenuModel } from "@/types/types";
import AppSubMenu from "./app-sub-menu";

import { TbHomeDot, TbListDetails } from "react-icons/tb";
import { RxCalendar } from "react-icons/rx";
import { MdOutlineSettings } from "react-icons/md";
import { LuBadgeHelp } from "react-icons/lu";

function AppMenu(): ReactElement {
  const model: MenuModel[] = [
    {
      label: "root",
      items: [
        {
          label: "Home",
          icon: <TbHomeDot size={40} />,
          to: "/",
        },
        {
          label: "Events",
          icon: <TbListDetails size={40} />,
          to: "/events",
        },
        {
          label: "Calendar",
          icon: <RxCalendar size={40} />,
          to: "/calendar",
        },
        {
          label: "Settings",
          icon: <MdOutlineSettings size={40} />,
          to: "/settings",
        },
        {
          label: "Help",
          icon: <LuBadgeHelp size={40} />,
          to: "/help",
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
}

export default AppMenu;
