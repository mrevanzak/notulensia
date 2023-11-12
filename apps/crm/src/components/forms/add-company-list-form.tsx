"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCompanyListSchema } from "@/lib/validations/add-company-list";
import type { AddCompanyList } from "@/lib/validations/add-company-list";
import Input from "../ui/input";
import Dropdown from "../ui/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AddUserCompanyList from "./user-form";

export default function AddCompanyListForm(): ReactElement {
  const [showDialog, setShowDialog] = useState(false);
  const users = [
    { userName: "User 1", userId: "1" },
    { userName: "User 2", userId: "2" },
    { userName: "User 3", userId: "3" },
    { userName: "User 4", userId: "4" },
    { userName: "User 5", userId: "5" },
  ];

  const methods = useForm<AddCompanyList>({
    resolver: zodResolver(addCompanyListSchema),
  });

  const { handleSubmit } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <form className="tw-flex tw-flex-col">
          <div className="tw-flex tw-items-center tw-w-full tw-mb-8 tw-gap-2">
            <div className="tw-w-1/2">
              <Input id="code" label="Code Company" />
            </div>
            <div className="tw-w-1/2">
              <Input id="district" label="District" />
            </div>
          </div>
          <div className="tw-mb-4 tw-flex tw-gap-2 tw-items-center tw-w-full">
            <div className="tw-w-1/2">
              <Input id="name" label="Company Name" />
            </div>
            <div className="tw-w-1/2 tw-relative">
              <Button
                className="tw-bg-blue tw-absolute -tw-top-5 tw-right-0"
                onClick={() => {
                  setShowDialog(true);
                }}
                type="button"
              >
                Add User
                <i className="pi pi-plus tw-ml-2" />
              </Button>
              <Dropdown
                editable
                id="user"
                label="User"
                optionLabel="userName"
                options={users}
              />
            </div>
          </div>
          <div className="tw-mb-4">
            <Input id="address" label="Address" />
          </div>
          <div className="tw-mb-4">
            <Input id="phone" label="Phone Number" />
          </div>
          <div className="tw-mb-4">
            <Input id="picName" label="PIC Name" />
          </div>
          <div className="tw-mb-4">
            <Input id="picPhone" label="PIC Phone Number" />
          </div>
          <div className="tw-mb-4">
            <Input id="province" label="Province" />
          </div>

          <div className="tw-flex tw-justify-end tw-gap-2 tw-w-full tw-ms-auto tw-mt-8">
            <Button
              className="tw-w-fit !tw-py-2 !tw-px-8"
              label="Submit"
              // loading={isPending}
              type="submit"
            />
            <Button
              className="tw-w-fit !tw-py-2 !tw-px-8"
              label="Cancel"
              outlined
              severity="secondary"
              // loading={isPending}
              type="button"
            />
          </div>
        </form>
      </FormProvider>
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
        <AddUserCompanyList />
      </Dialog>
    </>
  );
}
