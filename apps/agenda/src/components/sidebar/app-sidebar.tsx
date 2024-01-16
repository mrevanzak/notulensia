import type { ReactElement } from "react";
import React, { useContext, useRef } from "react";
import AppMenu from "./app-menu";
import { MenuProvider } from "../../context/menu-context";
import AppMenuProfile from "./app-menu-profile";
import { useGetUserDetail } from "@/lib/api/user/get-user-detail";
import Image from "next/image";
import { useGetFile } from "@/lib/api/storage/get-file";
import { LayoutContext } from "@/context/layout-context";

function AppSidebar(): ReactElement {
  let timeout: NodeJS.Timeout | null = null;
  const {layoutState, setLayoutState} = useContext(LayoutContext);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { data } = useGetUserDetail();
  const file = useGetFile("asset", data?.logoUrl);

  const onMouseEnter = (): void => {
    if (!layoutState.anchored) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        sidebarActive: true,
      }));
    }
  };

  const onMouseLeave = (): void => {
    if (!layoutState.anchored) {
      if (!timeout) {
        timeout = setTimeout(() => {
          setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            sidebarActive: false,
          }));
        }, 300);
      }
    }
  };

  return (
    <div className="layout-sidebar tw-h-full top-0 tw-rounded-r-xl" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={sidebarRef}>  
      <div className="layout-menu-container tw-mt-2">
        <div className="layout-sidebar-top">
        <Image
          alt="Logo Top"
          className="layout-sidebar-logo"
          width={280}
          height={45}
          src={file.data ? URL.createObjectURL(file.data) : "/svg/logo.svg"}
          style={{ maxWidth: '280px', maxHeight: '45px', objectFit: 'contain',}} 
        />
         <Image
          alt="Logo Small"
          className="layout-sidebar-logo-slim tw-mx-auto"
          width={40}
          height={40}
          src={"/svg/logo-small.svg"}
          /> 
        <button className="layout-sidebar-anchor p-link" type="button" onClick={() => setLayoutState((prevLayoutState) => ({ ...prevLayoutState, anchored: !prevLayoutState.anchored }))}></button>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-4 tw-flex-1">
          <AppMenuProfile />
          <MenuProvider>
            <AppMenu />
          </MenuProvider>
        </div>
      </div>
    </div>
  );
}
AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
