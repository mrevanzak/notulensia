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
          gradient.addColorStop(1, "rgba(65, 105, 225, 0.12)");
          gradient.addColorStop(0, "rgba(65, 105, 225, 0.01)");
          return gradient;
        },
        borderColor: "#4169E1",
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
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        border: {
          display: true,
        },
      },
    },
  };

  return (
    <Chart
      className="tw-h-[90%] tw-flex-1"
      data={lineData}
      options={lineOptions}
      type="line"
    />
  );
}
