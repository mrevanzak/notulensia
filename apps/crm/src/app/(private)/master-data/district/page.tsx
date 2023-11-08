"use client";
import { useDeleteDistrict } from "@/lib/api/district/delete-district";
import { useGetDistrict } from "@/lib/api/district/get-district";
import type { District } from "@/lib/validations/district";
import Link from "next/link";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import type { ReactElement } from "react";
import React from "react";

export default function DistrictPage(): ReactElement {
  const { data, isLoading } = useGetDistrict();
  const dataTable = data?.data;
  const deleteDistrict = useDeleteDistrict();

  const columns = [
    { field: "action", header: "Action" },
    { field: "code", header: "Code" },
    { field: "name", header: "District" },
  ];

  const actionBodyTemplate = (rowData: District) => {
    const confirm = () => {
      confirmDialog({
        resizable: false,
        contentClassName: "border-noround-top",
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        accept: () => {
          deleteDistrict.mutate(rowData.id);
        },
      });
    };
    return (
      <div className="tw-flex tw-space-x-2">
        <Link href={`/master-data/district/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" outlined />
        </Link>
        <Button icon="pi pi-trash" onClick={confirm} severity="danger" />
      </div>
    );
  };

  return (
    <div className="grid">
      <div className="col-12 mb-2 tw-flex tw-flex-row tw-justify-between">
        <h2>CRM</h2>
        <span className="p-input-icon-right tw-w-1/2">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search"
            pt={{
              root: { className: "tw-w-full" },
            }}
          />
        </span>
      </div>
      <div className="col-12 tw-flex tw-flex-col tw-gap-10">
        <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
          <p className="tw-text-xl tw-font-semibold">District List</p>
          <Link href="/master-data/district/add">
            <Button>
              Add
              <i className="pi pi-plus tw-ml-2" />
            </Button>
          </Link>
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
  );
}
