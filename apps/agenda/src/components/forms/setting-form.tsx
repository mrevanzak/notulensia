"use client";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Checkbox from "../ui/checkbox";

export default function SettingForm(): ReactElement {
  // const { mutate, isPending, isError, error } = useSignIn();

  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    // mutate({ ...data });
  });

  return (
    <FormProvider {...methods}>
      <form
        className="tw-flex tw-flex-col tw-w-2/3 tw-space-y-8 tw-mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <div>
          <h2 className="tw-font-normal">Notification Type</h2>
          <p>Select you’re notifications type.</p>
          <div className="tw-flex tw-space-x-8">
            <Checkbox id="email" label="Email" />
            <Checkbox id="telegram" label="Telegram" />
            <Checkbox id="whatsapp" label="Whatsapp" />
          </div>
        </div>
        <div>
          <h2 className="tw-font-normal">Dashboard Priority</h2>
          <p>Select you’re notifications type.</p>
          <div className="tw-flex tw-space-x-8">
            <Checkbox id="theme1" label="Theme 1" />
            <Checkbox id="theme2" label="Theme 2" />
            <Checkbox id="custom" label="Custom" />
          </div>
        </div>
        <div className="tw-self-end tw-h-full tw-flex">
          <Button className="tw-self-end" label="SAVE CHANGES" rounded />
        </div>
      </form>
    </FormProvider>
  );
}
