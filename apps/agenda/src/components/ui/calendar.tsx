"use client";
import { ReactElement, useEffect, useRef } from "react";
import React, { useState } from "react";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import type { Nullable } from "primereact/ts-helpers";
import { Dialog } from "primereact/dialog";
import { getDate } from "@/lib/date";
import ModalDate from "../calendar/modal-date";
import { useGetEventListCalendar } from "@/lib/api/event/get-event-list-calendar-by-date";
import moment from "moment";

export default function Calendar(): ReactElement {
  const calendarRef = useRef<PrimeCalendar>(null);

  const [date, setDate] = useState<Nullable<Date>>(null);
  const [showDialog, setShowDialog] = useState(false);

  const [viewDate, setViewDate] = useState(new Date());

  const { data } = useGetEventListCalendar({
    from: moment(viewDate).startOf("month").format("YYYY-MM-DD"),
    to: moment(viewDate).endOf("month").format("YYYY-MM-DD"),
  });

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
        onChange={(e) => {
          setDate(e.value);
          setShowDialog(true);
        }}
        onViewDateChange={(e) => {
          setViewDate(e.value);
        }}
        panelClassName="bg-purple-50"
        pt={{
          group: { className: "tw-space-y-12" },
          header: {
            className: "bg-purple-50 tw-relative tw-justify-end border-none",
          },
          title: { className: "tw-absolute tw-left-0 " },
          monthTitle: { className: "!tw-text-4xl" },
          yearTitle: { className: "!tw-text-4xl" },
          panel: { className: "border-none" },
          dayLabel: { className: "tw-px-12 tw-py-7" },
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
        <ModalDate />
      </Dialog>
    </>
  );
}
