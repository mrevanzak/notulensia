"use client";
import CustomerDetailInfo from "@/components/company/customer-list/customer-detail-info";
import EditCustomerForm from "@/components/forms/edit-customer-form";
import Image from "next/image";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState, type ReactElement } from "react";

const columnsEC = [
  { field: "no", header: "No" },
  { field: "name", header: "Name Event" },
  { field: "location", header: "Location" },
  { field: "start", header: "Start" },
  { field: "end", header: "End" },
];

const columnsUA = [
  { field: "no", header: "No" },
  { field: "activity", header: "Activity" },
  { field: "description", header: "Description" },
];

const columnsFH = [
  { field: "no", header: "No" },
  { field: "features", header: "Features" },
  { field: "duration", header: "Duration" },
  { field: "start", header: "Start At." },
  { field: "expired", header: "Expired At." },
];

const dataTable = [];

export default function EditCustomerPage(): ReactElement {
  const [viewTable, setViewTable] = useState("Event Company");
  const [showDialog, setShowDialog] = useState(false);

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
      <div className="col-12">
        <div className="card">
          <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
            <p className="tw-text-xl tw-font-semibold">Customer List</p>
            <Dialog
              className="tw-min-w-[30rem]"
              draggable={false}
              // header="Add Schedule Program"
              onHide={() => {
                setShowDialog(false);
              }}
              pt={{
                content: {
                  className: "border-noround-top",
                },
                header: {
                  className: "border-bottom-none flex gap-4 justify-between",
                },
              }}
              visible={showDialog}
            >
              <EditCustomerForm />
            </Dialog>
            <Button
              className="tw-bg-blue"
              onClick={() => {
                setShowDialog(true);
              }}
            >
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-3 w-full">
            <div className="tw-flex tw-items-center tw-justify-center tw-w-1/3">
              <Image
                alt="avatar"
                className="tw-rounded-full tw-object-cover tw-object-center"
                height={100}
                src="/layout/images/avatar/amyelsner.png"
                width={100}
              />
            </div>
            <div className="tw-flex tw-flex-col tw-w-1/3 gap-4">
              <CustomerDetailInfo content="Rizky Andre" title="Name" />
              <CustomerDetailInfo
                content="rizkyandre299@gmail.com"
                title="Email"
              />
              <CustomerDetailInfo content="22-09-2023" title="Registered At" />
            </div>
            <div className="tw-flex tw-flex-col tw-w-1/3 gap-4">
              <CustomerDetailInfo content="Features" title="Features" />
              <CustomerDetailInfo content="PT Mencari Rezeki" title="Company" />
              <CustomerDetailInfo content="Active" title="Status" />
            </div>
          </div>
        </div>
        <div className="tw-flex tw-items-center tw-gap-2 mb-4">
          <Button
            className={`tw-bg-blue ${
              viewTable === "Event Company" ? "tw-opacity-100" : "tw-opacity-50"
            }`}
            onClick={() => {
              setViewTable("Event Company");
            }}
            type="button"
          >
            Event Company
          </Button>
          <Button
            className={`tw-bg-blue ${
              viewTable === "User Activity" ? "tw-opacity-100" : "tw-opacity-50"
            }`}
            onClick={() => {
              setViewTable("User Activity");
            }}
            type="button"
          >
            User Activity
          </Button>
          <Button
            className={`tw-bg-blue ${
              viewTable === "Features History"
                ? "tw-opacity-100"
                : "tw-opacity-50"
            }`}
            onClick={() => {
              setViewTable("Features History");
            }}
            type="button"
          >
            Features History
          </Button>
        </div>
        <DataTable
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          value={dataTable}
        >
          {viewTable === "Event Company" &&
            columnsEC.map((col) => (
              <Column
                // body={col.field === "action" && actionBodyTemplate}
                field={col.field}
                header={col.header}
                key={col.field}
              />
            ))}
          {viewTable === "User Activity" &&
            columnsUA.map((col) => (
              <Column
                // body={col.field === "action" && actionBodyTemplate}
                field={col.field}
                header={col.header}
                key={col.field}
              />
            ))}
          {viewTable === "Features History" &&
            columnsFH.map((col) => (
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
