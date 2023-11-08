import type { ReactElement } from "react";
import type { MenuModel } from "@/types/types";
import AppSubMenu from "./app-sub-menu";
import { RxDashboard } from "react-icons/rx";
import {
  MdDataUsage,
  MdDomain,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { LuBellDot } from "react-icons/lu";

function AppMenu(): ReactElement {
  const model: MenuModel[] = [
    {
      label: "root",
      items: [
        {
          label: "Dashboard",
          icon: <RxDashboard />,
          to: "/dashboard",
        },
        {
          label: "Company",
          icon: <MdDomain />,
          to: "/company",
        },
        {
          label: "Master Data",
          icon: <MdDataUsage />,
          to: "/master-data",
        },
        {
          label: "Features",
          icon: <MdOutlineWorkspacePremium />,
          to: "/features",
        },
        {
          label: "Notifications",
          icon: <LuBellDot />,
          to: "/notifications",
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
}

export default AppMenu;