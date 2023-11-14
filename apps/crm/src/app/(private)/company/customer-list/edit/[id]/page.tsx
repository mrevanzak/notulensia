"use client";
import CustomerDetailInfo from "@/components/company/customer-list/customer-detail-info";
import { useGetUserDetail } from "@/lib/api/user/get-user-detail";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState, type ReactElement } from "react";
import moment from "moment";
import UserForm from "@/components/forms/user-form";
import { useGetEventCompanyByUserId } from "@/lib/api/event/get-event-company-by-user-id";
import type { Event } from "@/lib/validations/event";
import { useGetUserActivity } from "@/lib/api/user/get-user-activity";
import type { UserActivity } from "@/lib/validations/user";
import { useGetUserTierHistory } from "@/lib/api/tier/get-user-tier-history";

const columnsEC = [
  { field: "eventName", header: "Event Name" },
  { field: "isOnline", header: "Online?" },
  { field: "startAt", header: "Start" },
  { field: "endAt", header: "End" },
];

const columnsUA = [
  { field: "activity", header: "Activity" },
  { field: "description", header: "Description" },
  { field: "isCrm", header: "CRM User?" },
];

const columnsFH = [
  { field: "tierName", header: "Features" },
  { field: "duration", header: "Duration" },
  { field: "startAt", header: "Start At" },
  { field: "endAt", header: "Expired At" },
];

export default function EditCustomerPage(): ReactElement {
  const [viewTable, setViewTable] = useState("Event Company");
  const [showDialog, setShowDialog] = useState(false);

  const { id } = useParams();
  const { data } = useGetUserDetail(id as string);

  const eventCompany = useGetEventCompanyByUserId(id as string);
  const eventCompanyDataTable = eventCompany.data?.data ?? [];
  const userActivity = useGetUserActivity(id as string);
  const userActivityDataTable = userActivity.data?.data ?? [];
  const tierHistory = useGetUserTierHistory(id as string);
  const tierHistoryDataTable = tierHistory.data?.data ?? [];

  const isOnlineBodyTemplate = (rowData: Event) => {
    return rowData.isOnline ? "Yes" : "No";
  };
  const isCrmBodyTemplate = (rowData: UserActivity) => {
    return rowData.isCrm ? "Yes" : "No";
  };

  return (
    <div className="grid">
      <div className="col-12 mb-2">
        <h2>CRM</h2>
      </div>
      <div className="col-12">
        <div className="card tw-shadow">
          <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
            <p className="tw-text-xl tw-font-semibold">Customer List</p>
            <Dialog
              className="tw-min-w-[30rem]"
              draggable={false}
              onHide={() => {
                setShowDialog(false);
              }}
              pt={{
                content: {
                  className: "px-8 border-round-3xl py-4",
                },
              }}
              showHeader={false}
              visible={showDialog}
            >
              <div className="tw-flex tw-items-center tw-justify-center tw-flex-col tw-gap-4 tw-pb-4">
                <i
                  className="pi pi-user-edit text-primary"
                  style={{ fontSize: "5rem" }}
                />
                <p className="tw-text-2xl tw-font-bold">Edit Customer</p>
              </div>
              <UserForm edit setShowDialog={setShowDialog} />
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
          <div className="tw-flex">
            <div className="tw-flex tw-items-center tw-justify-center tw-w-1/5">
              <Image
                alt="avatar"
                className="tw-rounded-full tw-object-cover tw-object-center"
                height={100}
                src="/layout/images/avatar/amyelsner.png"
                width={100}
              />
            </div>
            <div className="tw-flex tw-flex-col tw-w-2/5 tw-space-y-6">
              <CustomerDetailInfo content={data?.name ?? ""} title="Name" />
              <CustomerDetailInfo content={data?.email ?? ""} title="Email" />
              <CustomerDetailInfo
                content={moment(data?.registeredAt).format("DD-MM-YYYY") ?? ""}
                title="Registered At"
              />
            </div>
            <div className="tw-flex tw-flex-col tw-w-2/5 tw-space-y-6">
              {/* <CustomerDetailInfo content="Features" title="Features" /> */}
              <CustomerDetailInfo
                content={data?.phoneNumber ?? ""}
                title="Phone Number"
              />
              <CustomerDetailInfo content={data?.status ?? ""} title="Status" />
              <CustomerDetailInfo
                content={moment(data?.expiredAt).format("DD-MM-YYYY") ?? ""}
                title="Expired At"
              />
            </div>
          </div>
        </div>
        <div className="card tw-shadow tw-space-y-6">
          <div className=" tw-flex tw-flex-row tw-justify-between tw-items-center">
            <div className="tw-flex tw-space-x-4">
              <Button
                className={`tw-bg-blue ${
                  viewTable === "Event Company"
                    ? "tw-opacity-100"
                    : "tw-opacity-50"
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
                  viewTable === "User Activity"
                    ? "tw-opacity-100"
                    : "tw-opacity-50"
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
            <span className="p-input-icon-right tw-w-1/3">
              <i className="pi pi-search" />
              <InputText
                placeholder="Search"
                pt={{
                  root: { className: "tw-w-full" },
                }}
              />
            </span>
          </div>
          {viewTable === "Event Company" && (
            <DataTable
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              value={eventCompanyDataTable}
            >
              {columnsEC.map((col) => (
                <Column
                  body={col.field === "isOnline" && isOnlineBodyTemplate}
                  field={col.field}
                  header={col.header}
                  key={col.field}
                />
              ))}
            </DataTable>
          )}
          {viewTable === "User Activity" && (
            <DataTable
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              value={userActivityDataTable}
            >
              {columnsUA.map((col) => (
                <Column
                  body={col.field === "isCrm" && isCrmBodyTemplate}
                  field={col.field}
                  header={col.header}
                  key={col.field}
                />
              ))}
            </DataTable>
          )}
          {viewTable === "Features History" && (
            <DataTable
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              value={tierHistoryDataTable}
            >
              {columnsFH.map((col) => (
                <Column
                  // body={col.field === "action" && actionBodyTemplate}
                  field={col.field}
                  header={col.header}
                  key={col.field}
                />
              ))}
            </DataTable>
          )}
        </div>
      </div>
    </div>
  );
}
