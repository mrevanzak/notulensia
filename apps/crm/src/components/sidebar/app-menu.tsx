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
          items: [
            {
              className: "!tw-pl-36",
              label: "Company List",
              to: "/company/company-list",
            },
            {
              className: "!tw-pl-36",
              label: "Customer List",
              to: "/company/customer-list",
            },
          ],
        },
        {
          label: "Master Data",
          icon: <MdDataUsage />,
          to: "/master-data",
          items: [
            {
              className: "!tw-pl-36",
              label: "Province List",
              to: "/master-data/province",
            },
            {
              className: "!tw-pl-36",
              label: "District List",
              to: "/master-data/district",
            },
            {
              className: "!tw-pl-36", 
              label: "Event Category List",
              to : "/master-data/event-category",
            },
          ],
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
