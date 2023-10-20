"use client";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";
import { Chart } from "primereact/chart";
import type { ReactElement } from "react";
import React from "react";

export default function LineChart(): ReactElement {
  const lineData: ChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
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

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
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
    <Chart
      className="tw-w-full tw-flex-1"
      data={lineData}
      options={lineOptions}
      type="line"
    />
  );
}
