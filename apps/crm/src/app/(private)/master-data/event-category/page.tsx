"use client";
import SearchInput from "@/components/ui/search-input";
import { useDeleteEventCategory } from "@/lib/api/event-category/delete-event-category";
import { useGetEventCategories } from "@/lib/api/event-category/get-event-categories";
import type { EventCategory } from "@/lib/validations/event-category";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import type { DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import type { ReactElement } from "react";
import React, { useState } from "react";

export default function EventCategoryPage(): ReactElement {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

  const { data, isLoading, isFetching } = useGetEventCategories({
    pageIndex: tableState.page,
    limit: tableState.rows,
    search: search ?? "",
  });
  const dataTable = data?.data;
  const deleteEventCategory = useDeleteEventCategory();

  const columns = [
    { field: "action", header: "Action" },
    { field: "id", header: "id" },
    { field: "eventCategoryName", header: "Event Category Name" },
  ];

  const actionBodyTemplate = (rowData: EventCategory) => {
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
        <Link href={`/master-data/event-category/edit/${rowData.id}`}>
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
        <SearchInput className="tw-w-1/2" />
      </div>
      <div className="col-12 tw-flex tw-flex-col tw-gap-10">
        <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
          <p className="tw-text-xl tw-font-semibold">Event Category List</p>
          <Link href="/master-data/event-category/add">
            <Button>
              Add
              <i className="pi pi-plus tw-ml-2" />
            </Button>
          </Link>
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
