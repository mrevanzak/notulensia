"use client";
import type { ReactElement } from "react";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { classNames, DomHandler } from "primereact/utils";
import {
  useEventListener,
  useMountEffect,
  useResizeListener,
  useUnmountEffect,
} from "primereact/hooks";
import { PrimeReactContext } from "primereact/api";
import type { AppTopbarRef, ChildContainerProps } from "@/types/types";
import { LayoutContext } from "../context/layout-context";
import AppSidebar from "./sidebar/app-sidebar";
import AppTobBar from "./topbar/app-topbar";

function Layout(props: ChildContainerProps): ReactElement {
  const {
    layoutConfig,
    layoutState,
    setLayoutState,
    setLayoutConfig,
    isSlim,
    isSlimPlus,
    isHorizontal,
    isDesktop,
    isSidebarActive,
  } = useContext(LayoutContext);
  const { setRipple } = useContext(PrimeReactContext);
  const topbarRef = useRef<AppTopbarRef>(null);
 
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOverlay, setIsOverlay] = useState(false);
  const [topbarMenuActive, setTopbarMenuActive] = useState(false);
  const [profileMode, setProfileMode] = useState('inline');
  const [activeTopbarItem, setActiveTopbarItem] = useState(null);
  const [rotateMenuButton, setRotateMenuButton] = useState(false);
  const [menuMode, setMenuMode] = useState('static');
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
  const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [configActive, setConfigActive] = useState(false);
  const copyTooltipRef = useRef();

  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: "click",
      listener: (event) => {
        const isOutsideClicked = !(
          sidebarRef.current?.isSameNode(event.target as Node) ||
          sidebarRef.current?.contains(event.target as Node) ||
          topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
          topbarRef.current?.menubutton?.contains(event.target as Node)
        );

        if (isOutsideClicked) {
          hideMenu();
        }
      },
    });

  const [bindDocumentResizeListener, unbindDocumentResizeListener] =
    useResizeListener({
      listener: () => {
        if (isDesktop() && !DomHandler.isTouchDevice()) {
          hideMenu();
        }
      },
    });

  const hideMenu = useCallback(() => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      overlaySubmenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
      resetMenu: (isSlim() || isSlimPlus() || isHorizontal()) && isDesktop(),
    }));
  }, [isSlim, isSlimPlus, isHorizontal, isDesktop]);

  const blockBodyScroll = (): void => {
    if (document.body.classList) {
      document.body.classList.add("blocked-scroll");
    } else {
      document.body.className += " blocked-scroll";
    }
  };

  const unblockBodyScroll = (): void => {
    if (document.body.classList) {
      document.body.classList.remove("blocked-scroll");
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          `(^|\\b)${"blocked-scroll".split(" ").join("|")}(\\b|$)`,
          "gi",
        ),
        " ",
      );
    }
  };
  useMountEffect(() => {
    setRipple && setRipple(layoutConfig.ripple);
  });



  useEffect(() => {
    const onRouteChange = (): void => {
      if (layoutConfig.colorScheme === "dark") {
        setLayoutConfig((prevState) => ({ ...prevState, menuTheme: "dark" }));
      }
    };
    onRouteChange();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isSidebarActive()) {
      bindMenuOutsideClickListener();
    }

    if (layoutState.staticMenuMobileActive) {
      blockBodyScroll();
      (isSlim() || isSlimPlus() || isHorizontal()) &&
        bindDocumentResizeListener();
    }

    return () => {
      unbindMenuOutsideClickListener();
      unbindDocumentResizeListener();
      unblockBodyScroll();
    };
  }, [
    layoutState.overlayMenuActive,
    layoutState.staticMenuMobileActive,
    layoutState.overlaySubmenuActive,
  ]);

  useEffect(() => {
    const onRouteChange = (): void => {
      hideMenu();
    };
    onRouteChange();
  }, [pathname, searchParams]);

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
  });

  const containerClassName = classNames(
    `layout-menu-${layoutConfig.menuTheme}`,
    `layout-menu-profile-${layoutConfig.menuProfilePosition}`,
    {
      "layout-overlay": layoutConfig.menuMode === "overlay",
      "layout-static": layoutConfig.menuMode === "static",
      "layout-slim": layoutConfig.menuMode === "slim",
      "layout-slim-plus": layoutConfig.menuMode === "slim-plus",
      "layout-horizontal": layoutConfig.menuMode === "horizontal",
      "layout-reveal": layoutConfig.menuMode === "reveal",
      "layout-drawer": layoutConfig.menuMode === "drawer",
      "p-input-filled": layoutConfig.inputStyle === "filled",
      "layout-sidebar-dark": layoutConfig.colorScheme === "dark",
      "p-ripple-disabled": !layoutConfig.ripple,
      "layout-static-inactive":
        layoutState.staticMenuDesktopInactive &&
        layoutConfig.menuMode === "static",
      "layout-overlay-active": layoutState.overlayMenuActive,
      "layout-mobile-active": layoutState.staticMenuMobileActive,
      "layout-topbar-menu-active": layoutState.topbarMenuActive,
      "layout-menu-profile-active": layoutState.menuProfileActive,
      "layout-sidebar-active": layoutState.sidebarActive,
      "layout-sidebar-anchored": layoutState.anchored,
    },
  );

  useEffect(() => {
    if(!isDesktop()){
      setIsOverlay(!layoutState.staticMenuMobileActive);
    };
  }, [layoutState.staticMenuDesktopInactive, layoutState.staticMenuMobileActive, isDesktop()])


  let menuClick = false;
  let topbarItemClick = false;
  let configClick = false;
  const onMenuButtonClick = (event) => {
    menuClick = true;
    setRotateMenuButton((prev) => !prev);
    setTopbarMenuActive(false);

    if (menuMode === 'overlay') {
        setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
    } else if (isDesktop()) {
        setStaticMenuDesktopInactive((prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive);
    } else
        { setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
    }

    event.preventDefault();
  };

  const hideOverlayMenu = () => {
    setOverlayMenuActive(false);
    setRotateMenuButton(false);
    setStaticMenuMobileActive(false);
  };

  const onTopbarMenuButtonClick = (event) => {
    topbarItemClick = true;
    setTopbarMenuActive((prevTopbarMenuActive) => !prevTopbarMenuActive);
    hideOverlayMenu();
    event.preventDefault();
  };

  const onTopbarItemClick = (e) => {
    topbarItemClick = true;

    if (activeTopbarItem === e.item) setActiveTopbarItem(null);
    else setActiveTopbarItem(e.item);

    e.originalEvent.preventDefault();
};

  const onDocumentClick = () => {
    if (!topbarItemClick) {
        setActiveTopbarItem(null);
        setTopbarMenuActive(false);
    }

    if (!menuClick) {
        if (isHorizontal() || isSlim()) {
            setMenuActive(false);
        }

        hideOverlayMenu();
    }

    if (configActive && !configClick) {
        setConfigActive(false);
    }

    menuClick = false;
    topbarItemClick = false;
    configClick = false;
  };
  return (
    <div className="layout tw-pt-[4rem]">
      <div className={classNames("layout-container layout-topbar-white",  containerClassName)}>
        <AppTobBar />
        <AppSidebar />
        <div className="layout-content-wrapper pt-0">
          <div className="layout-content w-full">{props.children}</div>
        </div>
        <div className="layout-mask modal-in" />
      </div>
    </div>
  );
}

export default Layout;
