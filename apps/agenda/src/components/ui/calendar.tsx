"use client";
import type { ReactElement } from "react";
import React, { useEffect, useRef, useState } from "react";
import type { CalendarPropsSingle } from "primereact/calendar";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import type { Nullable } from "primereact/ts-helpers";
import { Dialog } from "primereact/dialog";
import { getDate } from "@/lib/date";
import { useGetEventListCalendar } from "@/lib/api/event/get-event-list-calendar-by-date";
import moment from "moment";
import { useGetEventDetailByDate } from "@/lib/api/event/get-event-detail-by-date";
import { BiSolidVideoRecording } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";

export default function Calendar({ pt }: CalendarPropsSingle): ReactElement {
  const calendarRef = useRef<PrimeCalendar>(null);

  const [date, setDate] = useState<Nullable<Date>>(null);
  const [showDialog, setShowDialog] = useState(false);

  const [viewDate, setViewDate] = useState(new Date());

  const { data } = useGetEventListCalendar(viewDate);
  const { data: event } = useGetEventDetailByDate(date);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current
        ?.getElement()
        .querySelectorAll('[data-pc-section="daylabel"]')
        .forEach((el) => {
          const day = el.textContent;
          //
          data?.forEach((event) => {
            if (event.startAt.getDate().toString() === day) {
              el.classList.add("tw-relative");
              const span = document.createElement("span");
              span.classList.add(
                "tw-absolute",
                "tw-bottom-0",
                "tw-right-11",
                "tw-w-2",
                "tw-h-2",
                "tw-rounded-full",
                "bg-purple-500",
              );
              el.appendChild(span);
            }
          });
        });
    }
  }, [data]);

  return (
    <>
      <PrimeCalendar
        className="w-full"
        inline
        onSelect={(e) => {
          if (
            data?.some((event) =>
              moment(event.startAt).isSame(e.value as Date, "day"),
            )
          ) {
            setDate(e.value as Date);
            setShowDialog(true);
          }
        }}
        onViewDateChange={(e) => {
          setViewDate(e.value);
        }}
        panelClassName="bg-purple-50"
        pt={{
          header: {
            className: "bg-purple-50 tw-relative tw-justify-end border-none",
          },
          title: { className: "tw-absolute tw-left-0 " },
          panel: { className: "border-none" },
          ...pt,
        }}
        ref={calendarRef}
        value={date}
        viewDate={viewDate}
      />
      <Dialog
        className="tw-max-w-[40rem]"
        draggable={false}
        header={getDate(date)}
        onHide={() => {
          setShowDialog(false);
        }}
        pt={{
          content: {
            className: "border-noround-top px-5",
          },
          header: {
            className:
              "border-bottom-blue-700 border-bottom-2 flex gap-4 justify-between text-2xl text-blue-700 px-5",
          },
        }}
        visible={showDialog}
      >
        <div className="tw-w-full tw-flex tw-flex-col tw-gap-10">
          <div className="tw-flex tw-flex-col tw-gap-2">
            <h1 className="tw-font-semibold tw-text-2xl">Description</h1>
            <p>{event?.at(0)?.preparationNotes}</p>
          </div>
          <div className="tw-flex tw-gap-2 tw-justify-between tw-items-center">
            <div className="tw-flex tw-flex-col tw-gap-2">
              <p className="tw-text-2xl tw-font-semibold">Start</p>
              <span className="tw-flex tw-gap-2 tw-items-center">
                <i className="pi pi-clock" />
                {moment(event?.at(0)?.startAt).format("HH.mm")}
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2">
              <p className="tw-text-2xl tw-font-semibold">End</p>
              <span className="tw-flex tw-gap-2 tw-items-center">
                <i className="pi pi-clock" />
                {moment(event?.at(0)?.endAt).format("HH.mm")}
              </span>
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <h1 className="tw-font-semibold tw-text-2xl">Location / LinkUrl</h1>
            <p className="tw-bg-gray-200 tw-flex tw-items-center tw-gap-2">
              {event?.at(0)?.isOnline ? (
                <BiSolidVideoRecording
                  className="tw-bg-pink-400 tw-w-14"
                  size={26}
                />
              ) : (
                <IoLocationSharp
                  className="tw-bg-orange-400 tw-w-14"
                  size={26}
                />
              )}
              {event?.at(0)?.locationValue}
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
}
