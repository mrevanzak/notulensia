import {
  editCustomerListSchema} from "@/lib/validations/edit-customer-list";
import type {
  EditCustomerList
} from "@/lib/validations/edit-customer-list";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import Dropdown from "../ui/dropdown";
import Checkbox from "../ui/checkbox";
import { Button } from "primereact/button";

export default function EditCustomerForm(): ReactElement {
  const methods = useForm<EditCustomerList>({
    resolver: zodResolver(editCustomerListSchema),
  });

  const { handleSubmit } = methods;

  const features = [
    { features: "Event Company" },
    { features: "User Activity" },
    { features: "Feature History" },
  ];

  const company = [
    { company: "Company 1" },
    { company: "Company 2" },
    { company: "Company 3" },
  ];

  return (
    <>
      <div className="tw-flex tw-items-center tw-justify-center tw-flex-col tw-gap-4">
        <i
          className="pi pi-user-edit tw-text-blue"
          style={{ fontSize: "5rem" }}
        />
        <p className="tw-text-2xl tw-font-bold">Edit Customer</p>
      </div>
      <FormProvider {...methods}>
        <form className="tw-flex tw-flex-col tw-mt-8">
          <div className="tw-mb-4">
            <Input id="name" label="Name" />
          </div>
          <div className="tw-mb-4">
            <Input id="email" label="Email" type="email" />
          </div>
          <div className="tw-mb-4">
            <Dropdown
              editable
              id="features"
              label="Features"
              optionLabel="features"
              options={features}
            />
          </div>
          <div className="tw-mb-4">
            <Dropdown
              editable
              id="company"
              label="Company"
              optionLabel="company"
              options={company}
            />
          </div>
          <div className="tw-mb-4 tw-flex tw-items-center tw-gap-3">
            <Checkbox id="statusActive" label="active" />
            <Checkbox id="statusSuspend" label="suspend" />
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
