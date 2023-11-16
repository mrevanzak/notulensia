"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/input";
import Dropdown from "../ui/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import type { CompanyFormValues } from "@/lib/validations/company";
import { companyFormSchema } from "@/lib/validations/company";
import { useGetProvinceDropdown } from "@/lib/api/province/get-province-dropdown";
import { useGetDistrictDropdown } from "@/lib/api/district/get-district-dropdown";
import { useGetUserDropdown } from "@/lib/api/user/get-user-dropdown";
import { useInsertCompany } from "@/lib/api/company/insert-company";
import { useParams, useRouter } from "next/navigation";
import { useUpdateCompany } from "@/lib/api/company/update-company";
import UserForm from "./user-form";
import { useGetCompanyDetail } from "@/lib/api/company/get-company-detail";

type CompanyFormProps = {
  edit?: boolean;
};

export default function CompanyForm({
  edit = false,
}: CompanyFormProps): ReactElement {
  const router = useRouter();
  const { id } = useParams();

  const [showDialog, setShowDialog] = useState(false);

  const { data: values } = useGetCompanyDetail(id as string);
  const insertCompany = useInsertCompany();
  const updateCompany = useUpdateCompany();

  const methods = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit, watch } = methods;
  const onSubmit = handleSubmit((data) => {
    edit
      ? updateCompany.mutate({
          ...data,
          id: id as string,
        })
      : insertCompany.mutate(data);
  });

  const province = useGetProvinceDropdown();
  const district = useGetDistrictDropdown(watch("provinceId"));
  const user = useGetUserDropdown();

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="tw-space-y-8"
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit();
          }}
        >
          <Input className="tw-w-1/2" id="code" label="Code Company" />
          <div className="tw-flex tw-space-x-4">
            <Input className="tw-w-1/2" id="name" label="Company Name" />
            <div className="tw-w-1/2 tw-relative">
              <Button
                className="tw-bg-blue tw-absolute -tw-top-5 tw-right-0"
                onClick={() => {
                  setShowDialog(true);
                }}
                type="button"
              >
                Add
                <i className="pi pi-plus tw-ml-2" />
              </Button>
              <Dropdown
                id="userId"
                label="User"
                loading={user.isLoading}
                optionLabel="name"
                optionValue="id"
                options={user.data}
              />
            </div>
          </div>
          <Input className="tw-w-1/2" id="address" label="Address" />
          <Input className="tw-w-1/2" id="email" label="Email" />
          <Input className="tw-w-1/2" id="phoneNumber" label="Phone Number" />
          <Input className="tw-w-1/2" id="picName" label="PIC Name" />
          <Input
            className="tw-w-1/2"
            id="picPhoneNumber"
            label="PIC Phone Number"
          />
          <Dropdown
            className="tw-w-1/2"
            filter
            id="provinceId"
            label="Province"
            loading={province.isLoading}
            optionLabel="name"
            optionValue="id"
            options={province.data}
          />
          <Dropdown
            className="tw-w-1/2"
            filter
            id="districtId"
            label="District"
            loading={district.isLoading}
            optionLabel="name"
            optionValue="id"
            options={district.data}
          />
          <div className="tw-flex tw-justify-end tw-gap-2 tw-w-full tw-ms-auto tw-mt-8">
            <Button
              className="tw-w-fit !tw-py-2 !tw-px-8"
              label="Submit"
              loading={insertCompany.isPending || updateCompany.isPending}
              type="submit"
            />
            <Button
              className="tw-w-fit !tw-py-2 !tw-px-8"
              label="Cancel"
              onClick={() => {
                router.back();
              }}
              outlined
              severity="secondary"
              type="button"
            />
          </div>
        </form>
      </FormProvider>
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
            className="pi pi-user-plus text-primary"
            style={{ fontSize: "5rem" }}
          />
          <p className="tw-text-2xl tw-font-bold">Add New User</p>
        </div>
        <UserForm setShowDialog={setShowDialog} />
      </Dialog>
    </>
  );
}
