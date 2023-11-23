"use client";
import type { ReactElement } from "react";
import React, { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Link from "next/link";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useDeleteEventCategory } from "@/lib/api/event-category/delete-event-category";
import { useGetEventCategory } from "@/lib/api/event-category/get-event-categories";
import type { EventCategorySchema } from "@/lib/validations/event-category";

export default function EventCategories(): ReactElement {
  const { data, isLoading } = useGetEventCategory();
  const dataTable = data?.data;
  const deleteEventCategory = useDeleteEventCategory();

  const actionBodyTemplate = (rowData: EventCategorySchema) => {
    const confirm = () => {
      confirmDialog({
        resizable: false,
        contentClassName: "border-noround-top",
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        accept: () => {
          deleteEventCategory.mutate(rowData.id);
        },
      });
    };
    return (
      <div className="tw-flex tw-space-x-2">
        <Link href={`/data-master/event-category/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" outlined />
        </Link>
        <Button icon="pi pi-trash" onClick={confirm} severity="danger" />
      </div>
    );
  };

  const dt = useRef<DataTable<EventCategorySchema[]>>(null);

  return (
    <div className="card bg-purple-50 tw-space-y-3  tw-min-h-[calc(100vh-4rem)]">
      <h2 className="tw-my-4 tw-mb-6">
        Event Category
        <div className="tw-mt-4 tw-border tw-border-dark-purple"> </div>
      </h2>
      <div className="tw-flex tw-justify-between">
        <div className="tw-space-x-6">
          <Link href="/data-master/event-category/add">
            <Button className="border-round-sm" outlined>
              Add Event Category
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
        paginator
        ref={dt}
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        value={dataTable}
      >
        <Column body={actionBodyTemplate} field="action" header="Action" />
        <Column field="eventCategoryName" header = "Event Category Name" />
      </DataTable>
      <ConfirmDialog />
    </div>
  );
}
