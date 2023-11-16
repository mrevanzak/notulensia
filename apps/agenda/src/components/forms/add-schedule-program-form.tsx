import type { ReactElement } from "react";
import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { Button } from "primereact/button";
import CalendarInput from "@/components/ui/calendar-input";
import type { ScheduleProgram } from "@/lib/validations/schedule-program";
import { scheduleProgramSchema } from "@/lib/validations/schedule-program";
import { useScheduleProgramStore } from "@/stores/use-schedule-program-store";
import type { EventFormValues } from "@/lib/validations/event";

type AddScheduleProgramFormProps = {
  setShowDialog: (value: boolean) => void;
};

export default function AddScheduleProgramForm({
  setShowDialog,
}: AddScheduleProgramFormProps): ReactElement {
  const addScheduleProgram = useScheduleProgramStore((state) => state.add);

  const eventForm = useFormContext<EventFormValues>();
  const { watch } = eventForm;

  const methods = useForm<ScheduleProgram>({
    resolver: zodResolver(scheduleProgramSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    addScheduleProgram(data);
    setShowDialog(false);
  });

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 "
        onSubmit={(event) => {
          event.stopPropagation();
          event.preventDefault();
          void onSubmit();
        }}
      >
        <CalendarInput
          float
          icon
          id="date"
          label="Date"
          maxDate={new Date(watch("endAt"))}
          minDate={new Date(watch("startAt"))}
        />
        <Input float id="activity" label="Activity" />
        <div className="tw-flex tw-gap-8">
          <CalendarInput
            float
            icon
            id="startTime"
            label="Start Time"
            maxDate={new Date(watch("endAt"))}
            minDate={new Date(watch("startAt"))}
            timeOnly
          />
          <CalendarInput
            float
            icon
            id="endTime"
            label="End Time"
            maxDate={new Date(watch("endAt"))}
            minDate={new Date(watch("startAt"))}
            timeOnly
          />
        </div>
        <Input float id="picName" label="PIC Name" />
        <Input float id="note" label="Note" />
        <div className="tw-flex tw-justify-center tw-gap-4">
          <Button
            className="px-4 py-2 tw-flex-none tw-w-32 tw-self-center"
            label="Add"
            type="submit"
          />
          <Button
            className="px-4 py-2 tw-flex-none tw-w-32 tw-self-center"
            label="Cancel"
            onClick={() => {
              setShowDialog(false);
            }}
            severity="danger"
            type="button"
          />
        </div>
      </form>
    </FormProvider>
  );
}
