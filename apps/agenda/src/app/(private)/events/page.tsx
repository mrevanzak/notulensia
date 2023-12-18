"use client";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { Button } from "primereact/button";
import type { DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { Event } from "@/lib/validations/event";
import Link from "next/link";
import { useGetEvent } from "@/lib/api/event/get-event";
import { useDeleteEvent } from "@/lib/api/event/delete-event";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { classNames } from "primereact/utils";
import { RiDraftLine, RiTodoFill } from "react-icons/ri";
import { BiCheckCircle, BiTimer, BiXCircle } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/ui/search-input";
import { useExportEvent } from "@/lib/api/export/export-event";
import ExportButton from "@/components/export-button";

export default function Events(): ReactElement {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

  const { data, isLoading, isFetching } = useGetEvent({
    pageIndex: tableState.page,
    limit: tableState.rows,
    search: search ?? "",
  });
  const dataTable = data?.data;
  const deleteEvent = useDeleteEvent();
  const exportEvent = useExportEvent({
    pageIndex: tableState.page,
    limit: tableState.rows,
    search: search ?? "",
  });

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
          "p-tag border-round-md tw-flex tw-items-center tw-justify-center tw-gap-1",
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
  const statusPhase = (rowData: Event) => {
    return (
      <span className={`p-tag border-round-md tw-flex tw-items-center tw-justify-center tw-gap-1 ${rowData.phase === "PRE" && "p-tag-warning" || rowData.phase === "ONGOING" && "p-tag-info" || rowData.phase === "POST" && "p-tag-success"}`}>
        {rowData.phase === "PRE" && <RiTodoFill size={14} />}
        {rowData.phase === "ONGOING" && <BiTimer size={14} />}
        {rowData.phase === "POST" && <BiCheckCircle size={14} />}
        {rowData.phase}
      </span>
    )
  }
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

  return (
    <div className="card bg-purple-50 tw-space-y-3 tw-min-h-[calc(100vh-4rem)]">
      <div className="tw-flex tw-justify-between">
        <div className="tw-space-x-6">
          <Link href="/events/add">
            <Button className="border-round-sm" outlined>
              Add Events
            </Button>
          </Link>
          <ExportButton
            action={exportEvent.mutate}
            className="border-round-sm"
          />
        </div>
        <SearchInput className="tw-w-1/4" />
      </div>
      <DataTable
        first={tableState.first}
        lazy
        loading={isLoading || isFetching}
        onPage={(e) => {
          setTableState({
            ...tableState,
            page: e.page,
            rows: e.rows,
            pageCount: e.pageCount,
            first: e.first,
          });
        }}
        paginator
        rows={tableState.rows}
        rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
        tableStyle={{ minWidth: "50rem" }}
        totalRecords={data?.total}
        value={dataTable}
      >
        <Column body={actionBodyTemplate} field="action" header="Action" />
        <Column field="eventName" header="Event Name" />
        <Column field="startAt" header="Start" />
        <Column field="endAt" header="End" />
        <Column body={statusBodyTemplate} field="status" header="Status" />
        <Column body={statusPhase} field="phase" header="Event Phase" />
      </DataTable>
      <ConfirmDialog />
    </div>
  );
}
