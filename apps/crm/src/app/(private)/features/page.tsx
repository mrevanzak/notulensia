"use client";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import type { DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useState, type ReactElement } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { useGetTier } from "@/lib/api/tier/get-tier";
import { useDeleteTier } from "@/lib/api/tier/delete-tier";
import type { Tier } from "@/lib/validations/tier";
import SearchInput from "@/components/ui/search-input";
import { useSearchParams } from "next/navigation";

export default function FeaturesPage(): ReactElement {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

  const { data, isLoading, isFetching } = useGetTier({
    pageIndex: tableState.page,
    limit: tableState.rows,
    search: search ?? "",
  });
  const dataTable = data?.data;
  const deleteTier = useDeleteTier();

  const columns = [
    { field: "action", header: "Action" },
    { field: "name", header: "Name" },
    { field: "level", header: "Level" },
    { field: "price", header: "Price" },
    { field: "duration", header: "Duration" },
    { field: "status", header: "Status" },
  ];

  const actionBodyTemplate = (rowData: Tier) => {
    const confirm = () => {
      confirmDialog({
        resizable: false,
        contentClassName: "border-noround-top",
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        accept: () => {
          deleteTier.mutate(rowData.id);
        },
      });
    };
    return (
      <div className="tw-flex tw-space-x-2">
        <Link href={`/features/edit/${rowData.id}`}>
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
          <p className="tw-text-xl tw-font-semibold">Features List</p>
          <Link href="/features/add">
            <Button className="tw-bg-blue">
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
