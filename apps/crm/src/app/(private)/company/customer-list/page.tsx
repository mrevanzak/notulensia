"use client";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import type { DataTablePageEvent } from "primereact/datatable";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useState, type ReactElement } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { useGetUser } from "@/lib/api/user/get-user";
import { useDeleteUser } from "@/lib/api/user/delete-user";
import type { User } from "@/lib/validations/user";
import SearchInput from "@/components/ui/search-input";
import { useSearchParams } from "next/navigation";

export default function CustomerListPage(): ReactElement {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [tableState, setTableState] = useState<DataTablePageEvent>({
    first: 0,
    page: 0,
    rows: 10,
  });

  const { data, isLoading, isFetching } = useGetUser({
    pageIndex: tableState.page,
    limit: tableState.rows,
    search: search ?? "",
  });
  const dataTable = data?.data;
  const deleteUser = useDeleteUser();

  const columns = [
    { field: "action", header: "Action" },
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "phoneNumber", header: "Phone Number" },
    { field: "status", header: "Status" },
    { field: "registeredAt", header: "Registered At" },
  ];

  const actionBodyTemplate = (rowData: User) => {
    const confirm = () => {
      confirmDialog({
        resizable: false,
        contentClassName: "border-noround-top",
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        accept: () => {
          deleteUser.mutate(rowData.id);
        },
      });
    };
    return (
      <div className="tw-flex tw-space-x-2">
        <Link href={`/company/customer-list/edit/${rowData.id}`}>
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
          <p className="tw-text-xl tw-font-semibold">Customer List</p>
          <Link href="/company/customer-list/add">
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
