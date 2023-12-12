"use client";
import { useGetEventCategoryGraph } from "@/lib/api/event-category/get-event-category-graph";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";
import { Chart } from "primereact/chart";
import type { ReactElement } from "react";
import React, { useMemo } from "react";

export default function EventCategoryChart(): ReactElement {
  const { data } = useGetEventCategoryGraph();
  const lineData: ChartData = useMemo(() => {
    const labels = data?.map((item) => item.name) ?? [];
    const value = data?.map((item) => item.value) ?? [];

    return {
      labels,
      datasets: [
        {
          label: "Total Meets",
          data: value,
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
  }, [data]);

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
