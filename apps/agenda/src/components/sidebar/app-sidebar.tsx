import type { ReactElement } from "react";
import React from "react";
import AppMenu from "./app-menu";
import { MenuProvider } from "../../context/menu-context";
import AppMenuProfile from "./app-menu-profile";
import Logo from "~/svg/logo.svg";

function AppSidebar(): ReactElement {
  return (
    <div className="layout-menu-container tw-flex tw-flex-col">
      <div className="tw-my-10 tw-ml-16">
        <Logo className="tw-w-56" />
      </div>

      <div className="tw-flex tw-flex-col tw-flex-1">
        <AppMenuProfile />
        <MenuProvider>
          <AppMenu />
        </MenuProvider>
      </div>
    </div>
  );
}
AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
