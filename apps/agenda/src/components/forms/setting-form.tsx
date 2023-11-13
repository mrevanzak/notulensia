"use client";
import { useGetUserOption } from "@/lib/api/user/get-user-option";
import { useUpdateUserOption } from "@/lib/api/user/update-user-option";
import type { Option } from "@/lib/validations/user";
import { optionSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import RadioButton from "../ui/radio-button";

export default function SettingForm(): ReactElement {
  const { data: values } = useGetUserOption();
  const { mutate } = useUpdateUserOption();

  const methods = useForm<Option[]>({
    resolver: zodResolver(optionSchema.array()),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  const notificationOptions = [
    {
      value: "email",
      label: "Email",
    },
    {
      value: "telegram",
      label: "Telegram",
    },
    {
      value: "whatsapp",
      label: "Whatsapp",
    },
  ];
  const themeOptions = [
    {
      value: "theme1",
      label: "Theme 1",
    },
    {
      value: "theme2",
      label: "Theme 2",
    },
    {
      value: "custom",
      label: "Custom",
    },
  ];

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
            <RadioButton id="notification" options={notificationOptions} />
          </div>
        </div>
        <div>
          <h2 className="tw-font-normal">Dashboard Priority</h2>
          <p>Select you’re notifications type.</p>
          <div className="tw-flex tw-space-x-8">
            <RadioButton id="dashboard" options={themeOptions} />
          </div>
        </div>
        <div className="tw-self-end tw-h-full tw-flex">
          <Button className="tw-self-end" label="SAVE CHANGES" rounded />
        </div>
      </form>
    </FormProvider>
  );
}
