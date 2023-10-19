"use client";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import TimeManagement from "~/svg/time-management.svg";
import { Calendar } from "primereact/calendar";
import type { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";

function Dashboard(): ReactElement {
  const [date, setDate] = useState<Nullable<Date>>(null);

  return (
    <div className="grid">
      <div className="col-12 mb-4">
        <span className="p-input-icon-right w-1/3">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search"
            pt={{
              root: { className: "w-full" },
            }}
          />
        </span>
      </div>
      <div className="col-12">
        <div className="card tw-flex tw-justify-between !tw-p-10">
          <div className="tw-space-y-4 tw-flex tw-flex-col tw-min-h-full tw-w-1/2 tw-min-w-max">
            <p className="h0">Today Task</p>
            <h4 className="font-light">Check your daily tasks and schedules</h4>
            <button
              className="mt-auto w-12rem tw-justify-center p-button p-component"
              type="button"
            >
              Today&apos;s schedule
            </button>
          </div>
          <TimeManagement className="tw-max-w-xs" />
        </div>
      </div>
      <div className="tw-grid col-12 tw-grid-cols-5 tw-gap-4 !tw-space-y-0">
        <div className="card mb-0">01</div>
        <div className="card">02</div>
        <div className="card">03</div>
        <div className="card tw-col-span-2 tw-row-span-2">
          <Calendar className="w-full" inline onChange={(e) => { setDate(e.value); }} value={date} />
        </div>
        <div className="card tw-col-span-3">
          05
        </div>
      </div>  
    </div>
  );
}

export default Dashboard;
