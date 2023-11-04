import type { ReactElement } from "react";
import React from "react";
import { InputText } from "primereact/inputtext";
import Calendar from "@/components/ui/calendar";

export default function CalendarPage(): ReactElement {
  return (
    <div className="grid">
      <div className="col-12 mb-4">
        <span className="p-input-icon-right tw-w-1/4">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search"
            pt={{
              root: { className: "tw-w-full" },
            }}
          />
        </span>
      </div>
      <div className="col-12">
        <div className="card bg-purple-50">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
