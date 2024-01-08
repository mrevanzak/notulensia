import Image from "next/image";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React from "react";
import Logo from "~/svg/logo.svg";
import LandingHero from "~/img/landing-hero.png";

export default function LandingPage(): ReactElement {

  return (
    <>
    <nav className=" tw-font-exo tw-font-[600] tw-text-[20px] tw-w-full tw-h-[100px] tw-bg-white  tw-z-10 tw-flex tw-fixed tw-items-center">
      <Logo className="tw-h-[57px] tw-w-[353px] tw-ml-[99px] tw-mr-32" />
      <nav className="tw-flex tw-space-x-24">
        <a href="#about">About</a>
        <a href="#service">Service</a>
        <a href="#contact">Contact | EN</a>
      </nav>
      <Button label="Login" className="tw-ml-auto tw-mr-10 tw-w-32" style={{ borderRadius: "1000px", backgroundColor: "#334798" }} />
    </nav>


    <main className="tw-font-exo tw-w-full tw-bg-white tw-border-blue-400 tw-pt-[110px] tw-pl-10 tw-pr-10 tw-flex tw-flex-col tw-space-y-10">
        <div className="tw-flex tw-w-full  tw-justify-center tw-items-start">
          <div className="tw-w-[50%] tw-p-16">
            <div className="tw-mb-[20%] tw-max-w-[800px]">
              <h1 className="tw-text-base-purple tw-font-[600] tw-text-[85px] tw-w-full tw-leading-[100px]">Simplify Your Day, Organize Your Schedule</h1>
              <p className="tw-text-[30px] tw-text-red-500 tw-leading-relaxed">
                This website streamlines your meeting scheduling,<br/>
                making it easy<br/>
                to plan meetings, invite participants,<br/>
                and manage schedules efficiently.<br/>
              </p>
            </div>
            <Button className="tw-w-[285px] tw-h-[86px]" label="Get Started" style={{ borderRadius: "1000px", fontSize: "25px", fontWeight: "800", backgroundColor: "#334798", }}/>
          </div>
          <Image className="tw-object-contain tw-pt-10" src={LandingHero} alt="Hero" />
        </div>       
        <div>
          <h1 className="tw-text-center">Event Management</h1>
        </div>

    </main>
  </>
  );
}
