"use client";
import type { ReactElement } from "react";
import React, { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useGetEventList } from "@/lib/api/event/get-event-list";
import type { Event } from "@/lib/validations/event";

export default function Events(): ReactElement {
  const { data, isLoading } = useGetEventList();
  const dataTable = data?.data;

  const columns = [
    { field: "action", header: "Action" },
    { field: "date", header: "Date" },
    { field: "event_name", header: "Event Name" },
    { field: "total_audience", header: "Total Audience" },
    { field: "start", header: "Start" },
    { field: "end", header: "End" },
  ];
  const dt = useRef<DataTable<Event[]>>(null);
  const exportCSV = (selectionOnly: boolean): void => {
    dt?.current?.exportCSV({ selectionOnly });
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card bg-purple-50 tw-space-y-3">
          <div className="tw-flex tw-justify-between">
            <div className="tw-space-x-6">
              <Button className="border-round-sm" outlined>
                Add Events
              </Button>
              <Button
                className="border-round-sm"
                onClick={() => {
                  exportCSV(false);
                }}
              >
                Export
              </Button>
            </div>
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
          <DataTable
            loading={isLoading}
            // onPage={(e) => {
            //   e.pageCount = data?.numberOfPages;
            //   e.page = data?.pageIndex;
            // }}
            paginator
            ref={dt}
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            value={dataTable}
          >
            {columns.map((col) => (
              <Column field={col.field} header={col.header} key={col.field} />
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
}
