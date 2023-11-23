"use client";
import type { ReactElement } from "react";
import React, { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Link from "next/link";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useGetEventAddress } from "@/lib/api/event-address/get-event-address";
import { useDeleteEventAddress } from "@/lib/api/event-address/delete-event-address";
import type { EventAddress } from "@/lib/validations/event-address";
import { renderNullableValue } from "@/lib/nullable";

export default function EventAddressPage(): ReactElement {
  const { data, isLoading } = useGetEventAddress();
  const dataTable = data?.data;
  const deleteEventAddress = useDeleteEventAddress();

  const actionBodyTemplate = (rowData: EventAddress) => {
    const confirm = () => {
      confirmDialog({
        resizable: false,
        contentClassName: "border-noround-top",
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        accept: () => {
          deleteEventAddress.mutate(rowData.id);
        },
      });
    };
    return (
      <div className="tw-flex tw-space-x-2">
        <Link href={`/data-master/address/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" outlined />
        </Link>
        <Button icon="pi pi-trash" onClick={confirm} severity="danger" />
      </div>
    );
  };

  const dt = useRef<DataTable<EventAddress[]>>(null);
  const exportCSV = (selectionOnly: boolean): void => {
    dt?.current?.exportCSV({ selectionOnly });
  };

  return (
    <div className="card bg-purple-50 tw-space-y-3  tw-min-h-[calc(100vh-4rem)]">
      <h2 className="tw-my-4 tw-mb-6">
        Event Address
        <div className="tw-mt-4 tw-border tw-border-dark-purple"> </div>
      </h2>
      <div className="tw-flex tw-justify-between">
        <div className="tw-space-x-6">
          <Link href="/data-master/address/add">
            <Button className="border-round-sm" outlined>
              Add Event Address
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
        <Column field="location" header = "Location Name" />
        <Column body = {(data) => renderNullableValue(data.districtName)} field="district" header = "District" />
      </DataTable>
      <ConfirmDialog />
    </div>
  );
}
