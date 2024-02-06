"use client";
import React, { useEffect } from "react";
import type { ReactElement } from "react";
import { Button } from "primereact/button";
import { useGetEventDetail } from "@/lib/api/event/get-event-detail";
import { useParams } from "next/navigation";
import Link from "next/link";
import AudienceListCard from "../../cards/events/audience-list-card";
import { useAudienceStore } from "@/stores/use-audience-store";
import { useUpdateOngoingEvent } from "@/lib/api/event/update-ongoing-event";
import AttendanceHistoryCard from "../../cards/events/attendance-history-card";
import { FormProvider, useForm } from "react-hook-form";
import Editor from "@/components/ui/editor";
import { t } from "i18next";

export default function OngoingEventForm(): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const { data: values } = useGetEventDetail(id);

  const { mutate, isPending } = useUpdateOngoingEvent();
  const methods = useForm({
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit, watch } = methods;

  const setAudience = useAudienceStore((state) => state.set);
  useEffect(() => {
    setAudience(values?.audienceUsers ?? []);
  }, [values]);

  const onSubmit = handleSubmit((data) => {
    mutate({
      audienceUsers: useAudienceStore.getState().audience,
      id,
      note: watch("note") ?? null,
    });
  });

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-my-8 tw-pt-4"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <Editor id="note" label={t("Note Meeting")} placeHolder={t("You can write your note here")} />
        <AudienceListCard attend />
        <AttendanceHistoryCard />
        <div className="tw-flex tw-justify-end">
          <div className="tw-flex tw-gap-4">
            <Button
              label="Save"
              loading={isPending}
              outlined
              type="submit"
            />
            <Link href="/events">
              <Button label="Cancel" type="button" />
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
