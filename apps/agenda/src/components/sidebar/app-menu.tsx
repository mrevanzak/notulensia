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
  const model: MenuModel[] = [
    {
      label: "root",
      items: [
        {
          icon: <TbHomeDot color="#4343BF" size={40} />,
          label: "Home",
          to: "/dashboard",
        },
        {
          icon: <TbListDetails color="#4343BF" size={40} />,
          label: "Events",
          to: "/events",
        },
        {
          icon: <RxCalendar color="#4343BF" size={40} />,
          label: "Calendar",
          to: "/calendar",
        },
        {
          icon: <GoDatabase color="#4343BF" size={40} />,
          label : "Data Master",
          items: [
            {
              icon: <FaRegAddressCard className="tw-ml-5" color="#4343BF"  size={30} />,
              label: "Address",
              to: "/data-master/address",
            },
            {
              icon: <TbCategory2 className="tw-ml-5"  color="#4343BF" size={30} />,
              label: "Event Category",
              to: "/data-master/event-category",
            }
          ]
        },
        {
          icon: <MdGroups color="#4343BF" size={40} />,
          label: "Audience Group",
          to: "/audience-group",
        },
        {
          icon: <MdOutlineSettings color="#4343BF" size={40} />,
          label: "Settings",
          to: "/settings",
        },
        {
          icon: <LuBadgeHelp color="#4343BF" size={40} />,
          label: "Help",
          to: "/help",
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
}

export default AppMenu;
