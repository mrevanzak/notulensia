"use client";
import type { ReactElement } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { Event } from "@/lib/validations/event";
import Link from "next/link";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useGetAudience } from "@/lib/api/audience/get-audience";
import { useDeleteAudience } from "@/lib/api/audience/delete-audience";

export default function AudienceGroupPage(): ReactElement {
  const { data, isLoading } = useGetAudience();
  const dataTable = data?.data;
  const deleteEvent = useDeleteAudience();

  const columns = [
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
    { field: "totalAudience", header: "Total Audience" },
    { field: "action", header: "Action" },
  ];

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
        <Link href={`/audience-group/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" outlined />
        </Link>
        <Button icon="pi pi-trash" onClick={confirm} severity="danger" />
      </div>
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card bg-purple-50 tw-space-y-3">
          <div className="tw-flex tw-justify-between">
            <div className="tw-space-x-6">
              <Link href="/audience-group/add">
                <Button className="border-round-sm" outlined>
                  Add
                </Button>
              </Link>
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
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            value={dataTable}
          >
            {columns.map((col) => (
              <Column
                body={col.field === "action" && actionBodyTemplate}
                field={col.field}
                header={col.header}
                key={col.field}
              />
            ))}
          </DataTable>
          <ConfirmDialog />
        </div>
      </div>
    </div>
  );
}
