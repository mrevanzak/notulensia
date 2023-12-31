import type { ReactElement } from "react";
import React from "react";
import { InputText } from "primereact/inputtext";
import Calendar from "@/components/ui/calendar";

export default function CalendarPage(): ReactElement {
  return (
    <div className="tw-space-y-8">
      <span className="p-input-icon-right tw-w-1/4">
        <i className="pi pi-search" />
        <InputText
          placeholder="Search"
          pt={{
            root: { className: "tw-w-full" },
          }}
        />
      </span>
      <div className="bg-purple-50 tw-p-6 tw-rounded-xl tw-min-h-[calc(100vh-9rem)]">
        <Calendar
          pt={{
            group: { className: "tw-space-y-12" },
            monthTitle: { className: "!tw-text-4xl" },
            yearTitle: { className: "!tw-text-4xl" },
            dayLabel: { className: "tw-pl-4 tw-pr-24 tw-pt-4 tw-pb-14" },
          }}
        />
      </div>
    </div>
  );
}
