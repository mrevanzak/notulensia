import type { ReactElement } from "react";
import React from "react";
import AppMenu from "./app-menu";
import { MenuProvider } from "../../context/menu-context";
import Logo from "~/svg/logo.svg";
import { Tooltip } from "primereact/tooltip";
import AppMenuProfile from "./app-menu-profile";

function AppSidebar(): ReactElement {
  return (
    <div className="layout-menu-container tw-flex tw-flex-col pattern">
      <div className="tw-py-6 tw-flex tw-justify-center">
        <Logo className="tw-w-36" />
      </div>

      <div className="tw-flex tw-flex-col tw-flex-1">
        {/* TODO: remove this tooltip as it's not used but if you remove it, the whole app breaks*/}
        <Tooltip />
        <MenuProvider>
          <AppMenu />
        </MenuProvider>
      <AppMenuProfile />
      </div>
    </div>
  );
}
AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
