import Link from "next/link";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React from "react";
import LandingHero from "~/svg/landing-hero.svg";

export default function LandingPage(): ReactElement {
  return (
    <div className="tw-flex tw-px-8 md:tw-px-20 lg:tw-px-28 tw-flex-1 tw-items-center tw-flex-col-reverse lg:tw-flex-row">
      <div className="tw-space-y-6 lg:tw-w-1/2 tw-flex-none">
        <div className="tw-h-3 tw-w-28 tw-rounded-md tw-bg-[#699BF7]" />
        <h1 className="tw-text-4xl lg:tw-text-7xl hero">
          Effortless Scheduling, Seamless Meetings.
        </h1>
        <p className="tw-text-white tw-w-3/4">
          This website streamlines your meeting scheduling, making it easy to
          plan meetings, invite participants, and manage schedules efficiently.
        </p>
        <Link href="/auth/sign-in">
          <Button
            className="landing-button !tw-mt-16"
            label="Get Started"
            pt={{
              label: { className: "tw-text-lg lg:tw-text-2xl" },
            }}
          />
        </Link>
      </div>
      <LandingHero className="" />
    </div>
  );
}
