"use client";
import {
  addCustomerListSchema} from "@/lib/validations/add-customer-list";
import type {
  AddCustomerList
} from "@/lib/validations/add-customer-list";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import { Button } from "primereact/button";

export default function AddCustomerListForm(): ReactElement {
  const methods = useForm<AddCustomerList>({
    resolver: zodResolver(addCustomerListSchema),
  });

  const { handleSubmit } = methods;
  return (
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
        <div className="tw-mb-4">
          <Input id="phone" label="Phone Number" type="tel" />
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
  );
}
