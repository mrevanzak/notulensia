import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import type { ReactElement } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Column } from "primereact/column";

export default function CompanyListPage(): ReactElement {
  // const { data, isLoading } = useGetEvent();
  // const dataTable = data?.data;
  // const deleteEvent = useDeleteEvent();
  const dataTable = [
    {
      action: (
        <div className="tw-flex tw-space-x-2">
          <Link href="/company/company-list/12321412421">
            <Button icon="pi pi-pencil" outlined />
          </Link>
          <Button
            icon="pi pi-trash"
            // onClick={confirm}
            severity="danger"
          />
        </div>
      ),
      code: "ADM",
      name: "PT Mencari Cinta",
      address: "Jl. Mahakam 44",
      phone: "087756483920",
      userPIC: "Satria",
    },
    {
      action: (
        <div className="tw-flex tw-space-x-2">
          <Link href="/company/company-list/12321412421">
            <Button icon="pi pi-pencil" outlined />
          </Link>
          <Button
            icon="pi pi-trash"
            // onClick={confirm}
            severity="danger"
          />
        </div>
      ),
      code: "ADM",
      name: "PT Mencari Cinta",
      address: "Jl. Mahakam 45",
      phone: "087756483920",
      userPIC: "Satrio",
    },
  ];

  const columns = [
    { field: "action", header: "Action" },
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "address", header: "Address" },
    { field: "phone", header: "Phone Number" },
    { field: "userPIC", header: "User PIC" },
  ];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const actionBodyTemplate = (rowData: Event) => {
  //   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  //   // const confirm = () => {
  //   //   confirmDialog({
  //   //     resizable: false,
  //   //     contentClassName: "border-noround-top",
  //   //     message: "Do you want to delete this record?",
  //   //     header: "Delete Confirmation",
  //   //     icon: "pi pi-info-circle",
  //   //     acceptClassName: "p-button-danger",
  //   // accept: () => {
  //   //   deleteEvent.mutate(rowData.id);
  //   // },
  //   //   });
  //   // };
  //   return (
  //     <div className="tw-flex tw-space-x-2">
  //       <Link href="/company/company-list/12321412421">
  //         <Button icon="pi pi-pencil" outlined />
  //       </Link>
  //       <Button
  //         icon="pi pi-trash"
  //         // onClick={confirm}
  //         severity="danger"
  //       />
  //     </div>
  //   );
  // };

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
          <p className="tw-text-lg">Company List</p>
          <Link href="/company/company-list/add">
            <Button className="tw-bg-blue">
              Add
              <i className="pi pi-plus tw-ml-2" />
            </Button>
          </Link>
        </div>
        <DataTable
          // loading={isLoading}
          // onPage={(e) => {
          //   e.pageCount = data?.numberOfPages;
          //   e.page = data?.pageIndex;
          // }}
          paginator
          // ref={dt}
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          value={dataTable}
        >
          {columns.map((col) => (
            <Column
              // body={col.field === "action" && actionBodyTemplate}
              field={col.field}
              header={col.header}
              key={col.field}
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
}
