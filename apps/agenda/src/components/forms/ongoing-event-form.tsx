"use client";
import React, { useEffect } from "react";
import type { ReactElement } from "react";
import { Button } from "primereact/button";
import { useGetEventDetail } from "@/lib/api/event/get-event-detail";
import { useParams } from "next/navigation";
import Link from "next/link";
import AudienceListCard from "../audience-list-card";
import { useAudienceStore } from "@/stores/use-audience-store";
import { useUpdateOngoingEvent } from "@/lib/api/event/update-ongoing-event";
import AttendanceHistoryCard from "../attendance-history-card";
import SendNotifButton from "../send-notif-button";

export default function OngoingEventForm(): ReactElement {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const { data } = useGetEventDetail(id);
  const { mutate, isPending } = useUpdateOngoingEvent();

  const setAudience = useAudienceStore((state) => state.set);

  useEffect(() => {
    setAudience(data?.audienceUsers ?? []);
  }, [data]);

  const onSave = () => {
    mutate({
      audienceUsers: useAudienceStore.getState().audience,
      id,
    });
  };

  return (
    <>
      <AudienceListCard attend/>
      <AttendanceHistoryCard />
      <div className="tw-flex tw-justify-end">
        <div className="tw-flex tw-gap-4">
          <Button
            label="Save"
            loading={isPending}
            onClick={() => {
              onSave();
            }}
            outlined
          />
          <Link href="/events">
            <Button label="Cancel" type="button" />
          </Link>
        </div>
      </div>
    </>
  );
}
