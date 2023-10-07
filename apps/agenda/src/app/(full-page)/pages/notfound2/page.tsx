"use client";
import {useRouter} from "next/navigation";
import {Button} from "primereact/button";
import type {ReactElement} from "react";
import React from "react";

export default function NotFound(): ReactElement {
  const router = useRouter();
  const navigateToDashboard = (): void => {
    router.push("/");
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 opacity-70 bg-primary-reverse">
      <div className="flex align-items-center justify-content-center relative">
        <div className="w-full flex justify-content-end align-items-start absolute top-0 left-0 z-1" />
        <div className="h-screen flex justify-content-center align-items-center w-full lg:w-6">
          <div className="z-5 w-6 h-6">
            <span className="text-lg bg-bluegray-500 p-1 px-2 border-round-md text-900">
              404
            </span>
            <h1 className="text-6xl font-light my-4 mx-0 text-bluegray-500">
              Page Not Found
            </h1>
            <div className="w-7rem bg-bluegray-500" style={{height: "1px"}} />
            <p className="mt-4 text-lg text-900">
              Requested resource is not available right now. Please try again
              later.
            </p>
            <Button
              className="mt-5 border-none"
              label="Go To Dashboard"
              onClick={navigateToDashboard}
              style={{backgroundColor: "#5e81ac"}}
            />
          </div>
        </div>
        <svg
          className="absolute bottom-0 w-screen"
          viewBox="0 0 1440 250"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <linearGradient id="c" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="var(--bluegray-200)" />
              <stop offset="99.052%" stopColor="var(--bluegray-300)" />
            </linearGradient>
            <path
              d="M0 202c142.333-66.667 249-90 320-70 106.5 30 122 83.5 195 83.5h292c92.642-106.477 190.309-160.81 293-163 102.691-2.19 216.025 47.643 340 149.5v155.5H0V202z"
              id="b"
            />
            <filter
              filterUnits="objectBoundingBox"
              height="124.3%"
              id="a"
              width="105.1%"
              x="-2.6%"
              y="-12.8%"
            >
              <feOffset dy="-2" in="SourceAlpha" result="shadowOffsetOuter1" />
              <feGaussianBlur
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
                stdDeviation="12"
              />
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
              />
            </filter>
            <linearGradient id="d" x1="50%" x2="50%" y1="0%" y2="99.142%">
              <stop offset="0%" stopColor="var(--bluegray-300)" />
              <stop offset="100%" stopColor="var(--bluegray-500)" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(0 .5)">
              <use fill="#000" filter="url(#a)" xlinkHref="#b" />
              <use fill="url(#c)" xlinkHref="#b" />
            </g>
            <path
              d="M0 107c225.333 61.333 364.333 92 417 92 79 0 194-79.5 293-79.5S914 244 1002 244s156-45 195-68.5c26-15.667 107-74.167 243-175.5v357.5H0V107z"
              fill="url(#d)"
              transform="translate(0 .5)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
