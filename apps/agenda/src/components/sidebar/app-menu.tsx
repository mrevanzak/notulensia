import type { ReactElement } from "react";
import type { MenuModel } from "@/types/types";
import AppSubMenu from "./app-sub-menu";

import { TbCategory2, TbHomeDot, TbListDetails } from "react-icons/tb";
import { RxCalendar } from "react-icons/rx";
import { GoDatabase } from "react-icons/go";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdGroups, MdOutlineSettings } from "react-icons/md";
import { LuBadgeHelp } from "react-icons/lu";

function AppMenu(): ReactElement {
  const size = 40;
  const subSize = 30;
  const model: MenuModel[] = [
    {
      label: "root",
      items: [
        {
          icon: <TbHomeDot color="#4343BF" size={size} />,
          label: "Home",
          to: "/dashboard",
        },
        {
          icon: <TbListDetails color="#4343BF" size={size} />,
          label: "Events",
          to: "/events",
        },
        {
          icon: <RxCalendar color="#4343BF" size={size} />,
          label: "Calendar",
          to: "/calendar",
        },
        {
          icon: <GoDatabase color="#4343BF" size={size} />,
          label : "Data Master",
          items: [
            {
              icon: <FaRegAddressCard className="tw-ml-5" color="#4343BF"  size={subSize} />,
              label: "Address",
              to: "/data-master/address",
            },
            {
              icon: <TbCategory2 className="tw-ml-5"  color="#4343BF" size={subSize} />,
              label: "Event Category",
              to: "/data-master/event-category",
            }
          ]
        },
        {
          icon: <MdGroups color="#4343BF" size={size} />,
          label: "Audience Group",
          to: "/audience-group",
        },
        {
          icon: <MdOutlineSettings color="#4343BF" size={size} />,
          label: "Settings",
          to: "/settings",
        },
        {
          icon: <LuBadgeHelp color="#4343BF" size={size} />,
          label: "Help",
          to: "/help",
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
}

export default AppMenu;
