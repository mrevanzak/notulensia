"use client";
import type { ReactElement } from "react";
import React, { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { Event } from "@/lib/validations/event";
import Link from "next/link";
import { useGetEvent } from "@/lib/api/event/get-event";
import { useDeleteEvent } from "@/lib/api/event/delete-event";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { classNames } from "primereact/utils";
import { RiDraftLine } from "react-icons/ri";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";

export default function Events(): ReactElement {
  const { data, isLoading } = useGetEvent();
  const dataTable = data?.data;
  const deleteEvent = useDeleteEvent();

  const columns = [
    { field: "date", header: "Date" },
    { field: "eventName", header: "Event Name" },
    { field: "status", header: "Status" },
    { field: "audienceGroup", header: "Audience Group" },
    { field: "startAt", header: "Start" },
    { field: "endAt", header: "End" },
    { field: "action", header: "Action" },
  ];

  const statusBodyTemplate = (rowData: Event) => {
    const status = () => {
      if (rowData.status === "ACTIVE") {
        return "p-tag-success";
      }
      if (rowData.status === "INACTIVE") {
        return "p-tag-warning";
      }

      return "p-tag-danger";
    };
    return (
      <span
        className={classNames(
          "p-tag border-round-md tw-flex tw-items-center tw-gap-1",
          status(),
        )}
      >
        {rowData.status === "ACTIVE" && <BiCheckCircle size={14} />}
        {rowData.status === "DRAFT" && <RiDraftLine size={14} />}
        {rowData.status === "INACTIVE" && <BiXCircle size={14} />}
        {rowData.status}
      </span>
    );
  };
  const actionBodyTemplate = (rowData: Event) => {
    const confirm = () => {
      confirmDialog({
        resizable: false,
        contentClassName: "border-noround-top",
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        accept: () => {
          deleteEvent.mutate(rowData.id);
        },
      });
    };
    return (
      <div className="tw-flex tw-space-x-2">
        <Link href={`/events/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" outlined />
        </Link>
        <Button icon="pi pi-trash" onClick={confirm} severity="danger" />
      </div>
    );
  };

  const dt = useRef<DataTable<Event[]>>(null);
  const exportCSV = (selectionOnly: boolean): void => {
    dt?.current?.exportCSV({ selectionOnly });
  };

  return (
    <div className="card bg-purple-50 tw-space-y-3 tw-min-h-[calc(100vh-4rem)]">
      <div className="tw-flex tw-justify-between">
        <div className="tw-space-x-6">
          <Link href="/events/add">
            <Button className="border-round-sm" outlined>
              Add Events
            </Button>
          </Link>
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
        {columns.map((col) => {
          switch (col.field) {
            case "action":
              return (
                <Column
                  body={actionBodyTemplate}
                  field={col.field}
                  header={col.header}
                  key={col.field}
                />
              );
            case "status":
              return (
                <Column
                  body={statusBodyTemplate}
                  field={col.field}
                  header={col.header}
                  key={col.field}
                />
              );
            default:
              return undefined;
          }
        })}
      </DataTable>
      <ConfirmDialog />
    </div>
  );
}
