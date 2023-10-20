"use client";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import TimeManagement from "~/svg/time-management.svg";
import { Calendar } from "primereact/calendar";
import type { Nullable } from "primereact/ts-helpers";
import { Chart } from "primereact/chart";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";

function Dashboard(): ReactElement {
  const [date, setDate] = useState<Nullable<Date>>(null);

  const lineData: ChartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Total Tasks",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const { ctx, chartArea } = context.chart;

          if (!chartArea) {
            return;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#F1EDFF00");
          gradient.addColorStop(1, "#F3F0FF");
          return gradient;
        },
        borderColor: "#9854CB",
        tension: 0.4,
      },
    ],
  };

  const lineOptions: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: true,
        },
      },
    },
  };

  return (
    <div className="grid">
      <div className="col-12 mb-4">
        <span className="p-input-icon-right tw-w-1/4">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search"
            pt={{
              root: { className: "tw-w-full" }
            }}
          />
        </span>
      </div>
      <div className="col-12">
        <div className="card tw-flex tw-justify-between">
          <div className="tw-space-y-4 tw-flex tw-flex-col tw-min-h-full tw-w-1/2 tw-min-w-max tw-p-6">
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
        <div className="card tw-col-span-3 !tw-p-8 tw-space-y-4 tw-flex tw-flex-col">
          <h4>Tasks Completed</h4>
          <Chart
            className="tw-w-full tw-flex-1"
            data={lineData}
            options={lineOptions}
            type="line"
          />

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
