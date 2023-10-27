"use client";
import type { ReactElement } from "react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import type { EventFormValues } from "@/lib/validations/event";
import { eventFormSchema } from "@/lib/validations/event";
import TextArea from "@/components/ui/textarea";
import { Button } from "primereact/button";
import Checkbox from "@/components/ui/checkbox";
import CalendarInput from "@/components/ui/calendar-input";
import { useInsertEvent } from "@/lib/api/event/insert-event";
import Dropdown from "../ui/dropdown";

export default function AddEventForm(): ReactElement {
  const insertEvent = useInsertEvent();
  const methods = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      isOnline: false,
    },
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    insertEvent.mutate({ ...data });
  });

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <Dropdown
          float
          id="eventCategoryName"
          label="Event Category"
          // options={}
        />
        <Input float id="name" label="Event Name" />
        <Input float id="topic" label="Topic" />
        <Input float id="purpose" label="Purpose" />
        <TextArea float id="preparationNotes" label="Preparation Notes" />
        <Checkbox id="isOnline" label="Via Online" />
        <TextArea float id="locationValue" label="Location" />
        <div className="tw-flex tw-gap-8">
          <CalendarInput float icon id="startAt" label="Start Date" />
          <CalendarInput float icon id="endAt" label="End Date" />
        </div>

        <Button
          className="w-full !tw-p-4 !tw-mt-8"
          label="Login"
          loading={insertEvent.isPending}
          severity="secondary"
          type="submit"
        />
      </form>
    </FormProvider>
  );
}
