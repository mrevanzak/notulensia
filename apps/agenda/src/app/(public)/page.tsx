"use client"
import Image from "next/image";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React from "react";
import Logo from "~/svg/logo.svg";
import LandingHero from "~/img/landing-hero.png";
import HeroCreation from "~/img/hero-creation.png";
import BgHeroWa from "~/img/bg-hero-wa.png";
import BgHeroWaShadow from "~/img/bg-hero-wa-shadow.png";
import BgHeroEvent from "~/img/bg-hero-event.png";
import LogoFlat from "~/svg/logo-flat.svg";


export default function LandingPage(): ReactElement {

  return (
    <>
    <div className="tw-font-exo tw-font-[600] tw-text-[20px] tw-w-full tw-h-[100px] tw-bg-white tw-flex tw-fixed tw-items-center tw-justify-between tw-px-10">
      <div className="tw-flex tw-items-center">
        <Logo className="tw-h-[57px] tw-w-[353px] tw-mx-32" />
        <nav className="tw-flex tw-space-x-48">
          <a href="#about">About</a>
          <a href="#service">Service</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <div>
        <Button>En</Button>
        <Button label="Log In" className="" style={{ borderRadius: "1000px", backgroundColor: "#334798", width: "179px", height: "58px", fontFamily: "Exo", fontWeight: 600, fontSize: "20px" }} />
      </div>
    </div>


    <main className="tw-font-exo tw-w-full tw-bg-white tw-border-blue-400 tw-pt-[110px] tw-flex tw-flex-col tw-space-y-10">
        <article className="tw-flex tw-w-full tw-justify-center tw-items-start tw-pl-10 tw-pr-10">
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
          <Image className="tw-pt-10" width={835} height={778} src={LandingHero} alt="Hero" />
        </article>    

        <article className="tw-flex tw-flex-col tw-text-xs tw-w-full tw-justify-center tw-items-center tw-space-y-5 tw-pl-10 tw-pr-10">
          <div className="tw-space-y-8">
            <h1 className="tw-text-base-purple tw-text-center tw-text-[64px]">Event Management</h1>
            <p className="tw-text-center tw-text-base-purple tw-text-[24px] tw-font-notosan">Our Event Management feature is meticulously crafted to ensure every occasion you host is a resounding success.</p>
          </div>

          <div className="tw-w-[95%] tw-font-notosan ">
            <ul className="tw-w-full tw-h-[69px] tw-grid tw-grid-cols-3 tw-text-[32px] tw-font-[600] tw-justify-center tw-items-center">
              <li className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-bg-base-purple tw-text-white">Direct Email</li>
              <li className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">Invite Participants</li>
              <li className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-bg-base-pink tw-text-white">Create Meeting</li>
            </ul>

            <div className="tw-h-[690px]">
              <div className="tw-flex tw-justify-between tw-pr-[54px] tw-bg-base-pink">
                <Image alt="Hero" width={576} height={690} src={HeroCreation} />
                <div className="tw-flex tw-flex-col tw-items-end tw-justify-center tw-space-y-8">
                  <h1 className="tw-align-top tw-text-[96px] tw-leading-normal tw-max-w-[844px] tw-text-right tw-text-white">Hassle-Free Meeting Creation</h1>
                  <p className="tw-max-w-[958px] tw-text-right tw-text-[24px] tw-leading-normal tw-text-white">
                    Introducing a feature that simplifies the meeting creation process. With Notulensia, setting up a meeting is quick and intuitive, 
                    allowing you to focus on the substance of the discussion rather than the logistics.
                  </p>
                  <Button className="tw-w-[285px] tw-h-[86px]" outlined label="Try It ->" style={{ borderRadius: "1000px", fontSize: "25px", fontWeight: "400", borderColor: "white", color: "white" }}/>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="tw-flex tw-h-[1080px] tw-font-notosan">
          <div className="tw-bg-base-purple tw-flex tw-justify-start tw-pt-2 tw-flex-1 tw-items-center tw-flex-col tw-space-y-10">
            <div className="tw-flex tw-items-center tw-flex-col">
              <Image alt="Bg Hero Wa" width={797} height={653} src={BgHeroWa} />
              <Image alt="Bg Hero Wa Shadow" className="-tw-mt-2" width={258} height={24} src={BgHeroWaShadow} />
            </div>
            <div className="tw-space-y-10 tw-w-[741px] tw-flex tw-items-center tw-flex-col">
              <h1 className="tw-text-[64px] tw-font-[600] tw-text-white tw-text-center">WhatsApp Notifications</h1>
              <p className="tw-text-[24px] tw-font-[400] tw-w-[90%] tw-text-white tw-text-center tw-leading-normal">Connect with your participants more closely with notifications through WhatsApp. Receive important information and meeting updates directly in your favorite messaging app.</p>
            </div>
          </div>
          <div className="tw-relative">
            <Image alt="Bg Hero Event" className="tw-object-contain tw-z-0 tw-bg-base-pink" width={1014} height={1080} src={BgHeroEvent} />
            <div className="tw-w-[708px] tw-z-10 tw-absolute tw-bottom-[131px] tw-right-[95px] tw-space-y-5">
              <h1 className="tw-text-[64px] tw-font-[600] tw-text-white tw-text-right">Event Directory</h1>
              <p className="tw-text-white tw-text-right tw-text-[24px] tw-font-[400] tw-leading-normal tw-pl-5">Structured Meeting Evaluation: Explore the innovative Event Directory feature, allowing you to evaluate meeting outcomes with structured and organized feedback. Notulensia ensures that your post-meeting assessments are comprehensive and insightful.</p>
            </div>
          </div>
        </article>

        <footer className="tw-bg-base-purple tw-bg-opacity-50 tw-font-notosan">
          <div className="tw-flex tw-justify-center tw-items-center">
            <LogoFlat className = "tw-w-[450px] tw-h-[73px] tw-pl-[129px]"/>
            <div className="tw-text-center tw-text-[32px] tw-py-10 tw-flex tw-flex-1 tw-justify-center tw-space-x-32">
              <a>Company</a>
              <a>Why Notulensia?</a>
              <a>About</a>
              <a>Contact</a>
            </div>

          </div>
          <p className="tw-text-center tw-mt-5">&copy; 2024 PT Sarana Integrasi. All rights reserved.</p>
        </footer>

    </main>
  </>
  );
}
