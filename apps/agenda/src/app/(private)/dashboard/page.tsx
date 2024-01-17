"use client"
import type { ReactElement } from "react";
import React from "react";
import { InputText } from "primereact/inputtext";
import TimeManagement from "~/svg/time-management.svg";
import { Button } from "primereact/button";
import Calendar from "@/components/ui/calendar";
import EventCategoryChart from "@/components/dashboard/event-category-chart";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Dashboard(): ReactElement {
  const {t} = useTranslation();

  const footerCard = (
    <>
    <div className="tw-border"/>
    <div className="tw-flex tw-justify-end tw-pt-4">
      <Button className="tw-w-auto tw-h-5" style={{ backgroundColor: '#DCDFF9', color: '#7580E8', border: 'none'}} type="button">
        See More
        </Button> 
    </div>
    </>
  );

  const headerCard = (title:string) => {
    return (
      <h4>{title}</h4>
    );
  };

  return (
    <div className="grid">
      <div className="col-12 -tw-mb-5">
        <div className="card tw-flex tw-justify-between tw-relative tw-h-[280px]">
          <div className="tw-space-y-2 tw-flex tw-flex-col tw-min-h-full tw-w-1/4 tw-min-w-max tw-p-6 tw-pt-10">
            <h1 className="tw-text-[64px]">{t('Hi, Fajar SetiaBudi')}</h1>
            <h4 className="tw-font-light tw-pt-2">{t('Arrange your meeting plan today!')}</h4>
            <Link className="mt-auto" href="/events/add">
              <Button className="mt-auto w-12rem tw-justify-center">
                {t("Today's schedule")}
              </Button>
            </Link>
          </div>
          <TimeManagement className="tw-max-w-xs tw-absolute tw-right-10 -tw-top-12 " />
        </div>
      </div>
      <div className="tw-grid col-12 tw-grid-cols-12 tw-gap-2">
        <div className="card xl:tw-col-span-7 md:tw-col-span-12 tw-p-2 tw-flex tw-flex-col">
          <div className="tw-grid col-12 tw-row-span-2 tw-grid-cols-6 tw-gap-2 tw-min-h-[160px]">
              <div className="card tw-col-span-2 tw-shadow-xl" 
              >
                {headerCard(t('Upcoming Events'))}
                <ul className="tw-list-disc tw-ml-4 ">
                  <li>Event 1</li>
                  <li>Event 2</li>
                  <li>Event 3</li>
                </ul>
                {footerCard}
              </div>
              <div className="card tw-col-span-2 tw-shadow-xl" 
              >
                {headerCard(t('Upcoming Events'))}
                <ul className="tw-list-disc tw-ml-4 ">
                  <li>Event 1</li>
                  <li>Event 2</li>
                  <li>Event 3</li>
                </ul>
                {footerCard}
              </div>
              <div className="card tw-col-span-2 tw-shadow-xl" 
              >
                {headerCard(t('Upcoming Events'))}
                <ul className="tw-list-disc tw-ml-4 ">
                  <li>Event 1</li>
                  <li>Event 2</li>
                  <li>Event 3</li>
                </ul>
                {footerCard}
              </div>
          </div>
          <div className="tw-mt-2">
            <h4 className="tw-text-center">{t('Event Category')}</h4>
            <EventCategoryChart />
          </div>
        </div>
        <div className="card xl:tw-col-span-5  md:tw-col-span-12">
          <Calendar simple />
        </div>
      </div>
    </div>

  );
}
