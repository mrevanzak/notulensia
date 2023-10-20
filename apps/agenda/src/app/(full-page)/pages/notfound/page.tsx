"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React, { useContext, useEffect } from "react";
import { PrimeReactContext } from "primereact/api";
import type { ColorScheme } from "@/types/types";
import { LayoutContext } from "@/src/context/layout-context";

export default function NotFound(): ReactElement {
  const router = useRouter();
  const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);
  const prCtx = useContext(PrimeReactContext);

  const navigateToDashboard = (): void => {
    router.push("/");
  };
  useEffect(() => {
    const changeColorScheme = (colorScheme: ColorScheme): void => {
      prCtx.changeTheme?.(
        layoutConfig.colorScheme,
        colorScheme,
        "theme-link",
        () => {
          setLayoutConfig((prevState) => ({
            ...prevState,
            colorScheme,
            menuTheme: layoutConfig.colorScheme === "dark" ? "dark" : "light",
          }));
        }
      );
    };

    changeColorScheme("light");
    setLayoutConfig((prevState) => ({
      ...prevState,
      menuTheme: "light",
    }));
  }, [layoutConfig.colorScheme, prCtx, setLayoutConfig]);

  return (
    <div
      className="overflow-hidden m-0 relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/layout/images/pages/exception/bg-404.png" }}
    >
      <div className="text-center text-5xl pt-5 font-bold text-white">
        <div className="inline-block py-1 px-2 text-white surface-900">
          <span>Page</span>
        </div>
        <span className="text-color">Not Found</span>
      </div>
      <div className="w-full absolute bottom-0 text-center surface-900 h-14rem">
        <div className="w-full absolute text-center z-1" style={{ top: "-36px" }}>
          <img
            alt="avalon-react"
            src="/layout/images/pages/exception/icon-error.png"
          />
        </div>
        <div
          className="w-29rem relative text-white"
          style={{ marginLeft: "-200px", left: "50%", top: "30px" }}
        >
          <div className="p-3">
            <h3 className="m-0 mb-2 text-white">Page Not Found.</h3>
            <p className="m-0">Please contact system administrator.</p>
          </div>
          <Button label="Go To Dashboard" onClick={navigateToDashboard} />
        </div>
      </div>
    </div>
  );
}
