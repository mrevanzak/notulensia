"use client";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import type { Nullable } from "primereact/ts-helpers";
import { Dialog } from "primereact/dialog";
import { getDate } from "@/lib/date";
import ModalDate from "../calendar/modal-date";

export default function Calendar(): ReactElement {
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <PrimeCalendar
        className="w-full"
        inline
        onChange={(e) => {
          setDate(e.value);
          setShowDialog(true);
        }}
        panelClassName="bg-purple-50"
        pt={{
          header: { className: "bg-purple-50" },
        }}
        value={date}
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
