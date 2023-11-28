"use client";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { Button } from "primereact/button";
import type { DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Link from "next/link";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useGetEventAddress } from "@/lib/api/event-address/get-event-address";
import { useDeleteEventAddress } from "@/lib/api/event-address/delete-event-address";
import type { EventAddress } from "@/lib/validations/event-address";
import { renderNullableValue } from "@/lib/nullable";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/ui/search-input";

export default function EventAddressPage(): ReactElement {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

  const { data, isLoading, isFetching } = useGetEventAddress({
    pageIndex: tableState.page,
    limit: tableState.rows,
    search: search ?? "",
  });
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

  return (
    <div className="card bg-purple-50 tw-space-y-3  tw-min-h-[calc(100vh-4rem)]">
      <div className="tw-flex tw-justify-between">
        <div className="tw-space-x-6">
          <Link href="/data-master/address/add">
            <Button className="border-round-sm" outlined>
              Add Event Address
            </Button>
          </Link>
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
        <Column field="location" header="Location Name" />
        <Column
          body={(data) => renderNullableValue(data.districtName)}
          field="district"
          header="District"
        />
      </DataTable>
      <ConfirmDialog />
    </div>
  );
}
