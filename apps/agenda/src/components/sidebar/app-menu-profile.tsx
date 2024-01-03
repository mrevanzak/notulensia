"use client";
import { classNames } from "primereact/utils";
import type { ReactElement } from "react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Tooltip } from "primereact/tooltip";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { IoMdLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";
import { LayoutContext } from "@/context/layout-context";
import { useAuthStore } from "@/stores/use-auth-store";
import { useDownloadUserImage, useGetUserDetail } from "@/lib/api/user/get-user-detail";

function AppMenuProfile(): ReactElement {
  const logout = useAuthStore((state) => state.logout);
  const { data } = useGetUserDetail();

  const {
    layoutState,
    layoutConfig,
    isSlim,
    isHorizontal,
    onMenuProfileToggle,
  } = useContext(LayoutContext);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getImg = useDownloadUserImage();
  const { data: downloadedImage } = getImg;
  const [image, setImage] = useState<string | null>(null);

  const hiddenClassName = classNames({
    hidden: layoutConfig.menuMode === "drawer" && !layoutState.sidebarActive,
  });

  function truncateText(text: string | undefined, maxLength: number): string {
    if (!text) return '';
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  }

  const toggleMenu = (): void => {
    if (layoutState.menuProfileActive) {
      setTimeout(() => {
        (ulRef.current as any).style.maxHeight = "0";
      }, 1);
      (ulRef.current as any).style.opacity = "0";
      if (isHorizontal()) {
        (ulRef.current as any).style.transform = "scaleY(0.8)";
      }
    } else {
      setTimeout(() => {
        (ulRef.current as any).style.maxHeight = `${(
          ulRef.current as any
        ).scrollHeight.toString()}px`;
      }, 1);
      (ulRef.current as any).style.opacity = "1";
      if (isHorizontal()) {
        (ulRef.current as any).style.transform = "scaleY(1)";
      }
    }
    onMenuProfileToggle();
  };

  useEffect(() => {
    if (layoutState.menuProfileActive) toggleMenu();
  }, [pathname, searchParams]);

  const tooltipValue = (tooltipText: string): string | null => {
    return isSlim() ? tooltipText : null;
  };

  useEffect(() => {
    if (data?.imgUrl) {
      getImg.mutate(); 
    }
  }, [data?.imgUrl]);

  useEffect(() => {
    if (downloadedImage instanceof Blob) {
      const objectUrl = URL.createObjectURL(downloadedImage);
      setImage(objectUrl);
    }
  }, [downloadedImage]);
  

  return (
    <div className="layout-menu-profile border-none tw-relative overflow-visible tw-z-10">
      <Tooltip content={tooltipValue("Profile")!} target=".avatar-button" />
      <button
        className="avatar-button p-link shadow-none pl-6"
        onClick={toggleMenu}
        type="button"
      >
        <Image
          alt="avatar"
          className="tw-rounded-full tw-mt-2"
          height={56}
          src={image ?? "/img/user-default.jpg"}
          width={56}
        />
        <span>
          <b className="tw-text-lg">{truncateText(data?.name, 24)} </b>
          <p className="tw-text-xs">{data?.phoneNumber}</p>
        </span>
        <i
          className={classNames(
            "layout-menu-profile-toggler pi pi-fw tw-text-[#4343BF] tw-font-bold tw-text-xl",
            {
              "pi-angle-down":
                layoutConfig.menuProfilePosition === "start" || isHorizontal(),
              "pi-angle-up":
                layoutConfig.menuProfilePosition === "end" && !isHorizontal(),
            },
          )}
        />
      </button>

      <ul
        className={classNames(
          "menu-transition tw-border-2 tw-border-[#334798] tw-rounded-2xl ml-8 mr-4 tw-absolute tw-inset-x-0 tw-top-20 tw-bg-white",
          {
            overlay: isHorizontal(),
          },
        )}
        ref={ulRef}
        style={{ overflow: "hidden", maxHeight: 0, opacity: 0 }}
      >
        {layoutState.menuProfileActive ? (
          <>
            <li className="tw-border-b-2 tw-p-3 tw-border-[#334798] hover:tw-bg-[--menuitem-hover-bg]">
              <Link
                className="p-link tw-flex tw-space-x-4 tw-text-base tw-shadow-none"
                href="/profile"
              >
                <FaRegUser color="#4343BF" size={22} />
                <span className={hiddenClassName}>Profile</span>
              </Link>
            </li>
            <li className="tw-p-3 hover:tw-bg-[--menuitem-hover-bg]">
              <div
                className="p-link tw-flex tw-space-x-4 tw-text-base tw-shadow-none"
                onClick={() => {
                  logout();
                }}
              >
                <IoMdLogOut color="#4343BF" size={24} />
                <span className={hiddenClassName}>Logout</span>
              </div>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
}

export default AppMenuProfile;
