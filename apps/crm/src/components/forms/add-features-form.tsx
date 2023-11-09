"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import { Button } from "primereact/button";
import { AddFeatures, addFeaturesSchema } from "@/lib/validations/add-features";

export default function AddFeaturesForm(): ReactElement {
  const methods = useForm<AddFeatures>({
    resolver: zodResolver(addFeaturesSchema),
  });

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form className="tw-flex tw-flex-col">
        <div className="tw-mb-4">
          <Input id="name" label="Name" />
        </div>
        <div className="tw-mb-4">
          <Input id="level" label="Level" />
        </div>
        <div className="tw-mb-4">
          <Input id="price" label="Price" />
        </div>
        <div className="tw-mb-4">
          <Input id="duration" label="Duration" />
        </div>
        <div className="tw-mb-4">
          <Input id="status" label="Status" />
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