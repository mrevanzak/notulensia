import {
  addUserCompanyListSchema} from "@/lib/validations/add-user-company-list";
import type {
  AddUserCompanyListType
} from "@/lib/validations/add-user-company-list";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";

export default function AddUserCompanyList(): React.ReactElement {
  const [checked, setChecked] = useState(false);
  const methods = useForm<AddUserCompanyListType>({
    resolver: zodResolver(addUserCompanyListSchema),
  });

  const { handleSubmit } = methods;

  return (
    <>
      <div className="tw-flex tw-items-center tw-justify-center tw-flex-col tw-gap-4">
        <i
          className="pi pi-user-plus tw-text-blue"
          style={{ fontSize: "5rem" }}
        />
        <p className="tw-text-2xl tw-font-bold">Add New User</p>
      </div>
      <FormProvider {...methods}>
        <form className="tw-flex tw-flex-col">
          <div className="tw-mb-4">
            <Input id="name" label="Full Name" />
          </div>
          <div className="tw-mb-4">
            <Input id="email" label="email" type="email" />
          </div>
          <div className="tw-mb-4">
            <Input id="password" label="Password" type="password" />
          </div>
          <div className="tw-mb-4 tw-flex tw-items-center gap-2">
            <InputSwitch
              checked={checked}
              onChange={(e) => {
                setChecked(e.value);
              }}
            />
            <p className="block">CRM User</p>
          </div>
          <div className="tw-flex tw-gap-2 tw-w-full tw-mt-8">
            <Button
              className="tw-w-1/2 !tw-py-2 !tw-px-8"
              label="Save"
              // loading={isPending}
              type="submit"
            />
            <Button
              className="tw-w-1/2 !tw-py-2 !tw-px-8"
              label="Cancel"
              outlined
              severity="secondary"
              // loading={isPending}
              type="button"
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
