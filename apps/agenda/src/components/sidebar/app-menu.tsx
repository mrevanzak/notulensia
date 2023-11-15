import type { ReactElement } from "react";
import type { MenuModel } from "@/types/types";
import AppSubMenu from "./app-sub-menu";

import { TbCategory2, TbHomeDot, TbListDetails } from "react-icons/tb";
import { RxCalendar } from "react-icons/rx";
import { GoDatabase } from "react-icons/go";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdDomain, MdGroups, MdOutlineSettings } from "react-icons/md";
import { LuBadgeHelp } from "react-icons/lu";

function AppMenu(): ReactElement {
  const model: MenuModel[] = [
    {
      label: "root",
      items: [
        {
          label: "Home",
          icon: <TbHomeDot color="#4343BF" size={40} />,
          to: "/dashboard",
        },
        {
          label: "Events",
          icon: <TbListDetails color="#4343BF" size={40} />,
          to: "/events",
        },
        {
          label: "Calendar",
          icon: <RxCalendar color="#4343BF" size={40} />,
          to: "/calendar",
        },
        {
          label : "Data Master",
          icon: <GoDatabase color="#4343BF" size={40} />,
          items: [
            {
              label: "Address",
              to: "/data-master/address",
              icon: <FaRegAddressCard color="#4343BF" className="tw-ml-5" size={30} />,
            },
            {
              label: "Event Category",
              icon: <TbCategory2 color="#4343BF" className="tw-ml-5" size={30} />,
              to: "/data-master/event-category",
            }
          ]
        },
        {
          label: "Audience Group",
          icon: <MdGroups color="#4343BF" size={40} />,
          to: "/audience-group",
        },
        {
          label: "Settings",
          icon: <MdOutlineSettings color="#4343BF" size={40} />,
          to: "/settings",
        },
        {
          label: "Help",
          icon: <LuBadgeHelp color="#4343BF" size={40} />,
          to: "/help",
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
}

export default AppMenu;
