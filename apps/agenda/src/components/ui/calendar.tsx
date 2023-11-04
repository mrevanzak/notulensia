"use client";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import type { Nullable } from "primereact/ts-helpers";

export default function Calendar(): ReactElement {
  const [date, setDate] = useState<Nullable<Date>>(null);
  return (
    <PrimeCalendar
      className="w-full"
      inline
      onChange={(e) => {
        setDate(e.value);
      }}
      panelClassName="bg-purple-50"
      pt={{
        header: { className: "bg-purple-50" },
      }}
      value={date}
    />
  );
}
