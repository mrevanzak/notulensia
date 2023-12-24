import type { ReactElement } from "react";
import React from "react";
import AppMenu from "./app-menu";
import { MenuProvider } from "../../context/menu-context";
import AppMenuProfile from "./app-menu-profile";
import { useGetUserDetail } from "@/lib/api/user/get-user-detail";
import Image from "next/image";
import { useGetFile } from "@/lib/api/storage/get-file";

function AppSidebar(): ReactElement {
  const { data } = useGetUserDetail();
  const file = useGetFile("asset", data?.logoUrl);

  return (
    <div className="layout-menu-container tw-flex tw-flex-col">
      <div className="tw-my-10 tw-h-16 tw-relative">
        <Image
          alt="profile"
          height={6}
          src={file.data ? URL.createObjectURL(file.data) : "/svg/logo.svg"}
          style={{ width: '380px', height: '60px', objectFit: 'contain' }} 
          width={38}
        />
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
