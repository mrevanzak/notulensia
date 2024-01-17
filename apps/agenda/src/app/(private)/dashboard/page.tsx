"use client"
import type { ReactElement } from "react";
import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import TimeManagement from "~/svg/time-management.svg";
import { Button } from "primereact/button";
import Calendar from "@/components/ui/calendar";
import EventCategoryChart from "@/components/dashboard/event-category-chart";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getDataDashboardKey, useGetDataDashboard } from "@/lib/api/dashboard/get-data-dashboard";
import moment from "moment";
import { truncateText } from "@/utils/string-utils";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "primereact/tooltip";



export default function Dashboard(): ReactElement {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const dashboardData = useGetDataDashboard();
  
  useEffect(() => {
    void queryClient.refetchQueries({ queryKey: [getDataDashboardKey] });
  }, []);

  const footerCard = (
    <div className="tw-absolute tw-bottom-5 tw-bg-white tw-w-full tw-right-5">
      <div className="tw-border" />
      <div className="tw-flex tw-justify-end tw-pt-4">
        <Button className="tw-w-auto tw-h-5" onClick={() => { window.open('/events', '_self') }} style={{ backgroundColor: '#DCDFF9', color: '#7580E8', border: 'none' }} type="button">
          See More
        </Button>
      </div>
    </div>
  );

  const headerCard = (title: string, no: number) => {
    let tagColor = "p-tag-warning";
    if (no === 2) {
      tagColor = "p-tag-info";
    } else if (no === 3) {
      tagColor = "p-tag-success";
    }
    return (
      <div className="tw-flex tw-gap-2 tw-items-center">
        <h4>{title}</h4>
        <i className={`tw-h-4 tw-w-4 tw-rounded-full p-tag ${tagColor}`} />
      </div>
    );
  };


  return (
    <div className="grid">
      <div className="col-12 -tw-mb-5">
        <div className="card tw-flex tw-justify-between tw-relative tw-h-[280px]">
          <div className="tw-space-y-2 tw-flex tw-flex-col tw-min-h-full tw-w-1/4 tw-min-w-max tw-p-6 tw-pt-10">
            <h1 className="tw-text-[64px]">{t(`Hi, ${truncateText(dashboardData.data?.name, 25)}`)}</h1>
            <h4 className="tw-font-light tw-pt-2">{t('Arrange your meeting plan today!')}</h4>
            <Link className="mt-auto" href="/events/add">
              <Button className="mt-auto w-12rem tw-justify-center">
                {t("Today's schedule")}
              </Button>
            </Link>
          </div>
          <TimeManagement className="tw-max-w-xs tw-absolute tw-right-10 -tw-top-12 max-xl:tw-hidden " />
        </div>
      </div>
      <div className="tw-grid col-12 tw-grid-cols-12 tw-gap-4">
        <div className="card xl:tw-col-span-7 md:tw-col-span-12 tw-flex tw-justify-between tw-flex-col">
          <div className="tw-grid col-12 tw-row-span-2 tw-grid-cols-6 tw-gap-4 " style={{ minHeight: '250px' }}>

            {/* post */}
            <div
              className="card tw-col-span-2 tw-shadow-lg tw-relative"
              style={{ maxHeight: '300px', minWidth: '200px', overflow: 'auto', overflowY: 'auto' }}
            >
              {headerCard(t('Completed Event'), 3)}
              {
                dashboardData.data?.post?.length !== 0 ?
                  (
                    <ul className="tw-list-disc tw-ml-4 tw-my-4 tw-z-10 ">
                      {
                        dashboardData.data?.post?.slice(0, 3).map((event) => (
                          <li key={event.id}>
                             <a className="p-link" href={`/events/edit/${event.id}`}>
                              {moment(event.endAt).format('DD-MM-YYYY')} {`${truncateText(event.eventName, 12)}`}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  )
                  :
                  (
                    <Image
                      alt="Bg Card"
                      className="tw-aspect-square tw-p-5 tw-my-auto tw-mx-auto"
                      fill
                      src="/svg/schedule-free.svg"
                      style={{maxWidth:'16rem'}}
                    />
                  )
              }
              {footerCard}
            </div>
            {/* ongoing */}
            <div
              className="card tw-col-span-2 tw-shadow-lg tw-relative"
              style={{ maxHeight: '300px', minWidth: '200px', overflow: 'auto', overflowY: 'auto' }}
            >
              {headerCard(t('Ongoing Event'), 2)}
              {
                dashboardData.data?.onGoing?.length !== 0 ?
                  (
                    <ul className="tw-list-disc tw-ml-4 tw-my-4 tw-z-10 ">
                      {
                        dashboardData.data?.onGoing?.slice(0, 3).map((event) => (
                          <li key={event.id}>
                             <a className="p-link" href={`/events/edit/${event.id}`}>
                              {moment(event.startAt).format('DD-MM-YYYY')} {`${truncateText(event.eventName, 12)}`}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  )
                  :
                  (
                    <Image
                      alt="Bg Card"
                      className="tw-aspect-square tw-p-5 tw-my-auto tw-mx-auto"
                      fill
                      src="/svg/schedule-free.svg"
                      style={{maxWidth:'16rem'}}
                    />
                  )
              }
              {footerCard}
            </div>
            {/* pre */}
            <div
              className="card tw-col-span-2 tw-shadow-lg tw-relative"
              style={{ maxHeight: '300px', minWidth: '200px', overflow: 'auto', overflowY: 'auto' }}
            >
              {headerCard(t('Upcoming Event'), 1)}
              {
                dashboardData.data?.pre?.length !== 0 ?
                  (
                    <ul className="tw-list-disc tw-ml-4 tw-my-4 tw-z-10 ">
                      {
                        dashboardData.data?.pre?.slice(0, 3).map((event) => (
                          <li key={event.id}> 
                            <a className="p-link" href={`/events/edit/${event.id}`}>
                              {moment(event.startAt).format('DD-MM-YYYY')} {`${truncateText(event.eventName, 12)}`}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  )
                  :
                  (
                    <Image
                      alt="Bg Card"
                      className="tw-aspect-square tw-p-5 tw-my-auto tw-mx-auto"
                      fill
                      src="/svg/schedule-free.svg"
                      style={{maxWidth:'16rem'}}
                    />
                  )
              }

              {footerCard}
            </div>

          </div>
          <div className="tw-shadow-lg tw-rounded-xl tw-border tw-pt-5 tw-h-full tw-flex-1 tw-mx-2">
            <h4 className="tw-text-center">{t('Event Category')}</h4>
            <EventCategoryChart />
          </div>
        </div>
        <div className="card xl:tw-col-span-5  md:tw-col-span-12">
          <Calendar simple />
        </div>
      </div>

      <Tooltip  content={t('See Detail')} position="bottom" target="li>a" />
      <Tooltip  content={t('See Detail')} position="bottom" target=".fc-event" />
    </div>
  );
}
