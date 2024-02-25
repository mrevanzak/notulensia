"use client";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { Button } from "primereact/button";
import { useGetEventDetail } from "@/lib/api/event/get-event-detail";
import { useParams } from "next/navigation";
import Link from "next/link";
import AudienceListCard from "../../cards/events/audience-list-card";
import { useAudienceStore } from "@/stores/use-audience-store";
import { useUpdateOngoingEvent } from "@/lib/api/event/update-ongoing-event";
import AttendanceHistoryCard from "../../cards/events/attendance-history-card";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import Editor from "@/components/ui/editor";
import { useTranslation } from "react-i18next";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import Dropdown from "@/components/ui/dropdown";
import { useGetEventOngoingDetail } from "@/lib/api/event/get-event-ongoing-detail";
import { useUpsertOngoinEvent } from "@/lib/api/event/upsert-ongoing-event";
import { ProgressSpinner } from "primereact/progressspinner";
import { Skeleton } from "primereact/skeleton";
import { useInterval } from "primereact/hooks";
import { UpdateEventCategorySchemaForm } from "@/lib/validations/event-category";
import { UpdateEventFormSchema } from "@/lib/validations/event";
import CalendarInput from "@/components/ui/calendar-input";

type OngoingEventFormProps = {
  endAt: Date;
};

export default function OngoingEventForm({ endAt }: OngoingEventFormProps): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const [ongoingDate, setOngoingDate] = useState<Date>(endAt < new Date() ? endAt : new Date());
  const [isLoading, setIsLoading] = useState(false);
  const { data: values, refetch, isLoading: loadingDetail, isRefetching } = useGetEventOngoingDetail({ eventId: id, date: moment(ongoingDate).format("yyyy-MM-DD") });

  const { mutate, isPending } = useUpsertOngoinEvent();
  const methods = useForm({
    values,
    resetOptions: {
      keepDirtyValues: false,
    },
  });
  const { handleSubmit, watch } = methods;

  const setAudience = useAudienceStore((state) => state.set);


  useEffect(() => {
    setAudience(values?.audienceUsers ?? []);
  }, [values]);

  useEffect(() => {
    void refetch();
  }, [ongoingDate]);

  const onSubmit = handleSubmit((data) => {
    mutate({
      audienceUsers: useAudienceStore.getState().audience,
      id,
      note: watch("note") ?? null,
      date: moment(ongoingDate).format("yyyy-MM-DD")
    });
    void refetch();
  });

  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(loadingDetail);
  }, [loadingDetail]);

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-my-2 tw-pt-4"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >

        <CalendarInput
          dateFormat="DD, dd MM yy"
          float
          icon
          id="endAt"
          label={t("Select Event Date")}
          maxDate={endAt}
          minDate={moment(values?.startAt).toDate()}
          onChange={(e) => { setOngoingDate(e.value ?? new Date()) }}
          required
          value={ongoingDate}
        />


        <Editor id="note" isLoading={(isLoading || isRefetching)} label={t("Note Meeting")} placeHolder={t("You can write your note here")} />
        <AudienceListCard attend isLoading={(isLoading || isRefetching)} />
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

