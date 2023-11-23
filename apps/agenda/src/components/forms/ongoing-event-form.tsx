"use client";
import React, { useEffect } from "react";
import type { ReactElement } from "react";
import { Button } from "primereact/button";
import { useGetEventDetail } from "@/lib/api/event/get-event-detail";
import { useParams } from "next/navigation";
import Link from "next/link";
import AudienceListCard from "../audience-list-card";
import { useGetAudienceDetail } from "@/lib/api/audience/get-audience-detail";
import { useAudienceStore } from "@/stores/use-audience-store";
import { useUpdateOngoingEvent } from "@/lib/api/event/update-ongoing-event";

export default function OngoingEventForm(): ReactElement {
  const { id } = useParams();
  const { data } = useGetEventDetail(id as string);
  const { mutate, isPending } = useUpdateOngoingEvent();

  const audienceIds = data?.audiences?.map((item) => item.audienceId) ?? [];
  const audienceList = useGetAudienceDetail(audienceIds);
  const setAudience = useAudienceStore((state) => state.set);

  useEffect(() => {
    const audiences = audienceList.flatMap(
      (item) => item.data?.audiences ?? [],
    );
    setAudience(audiences);
  }, [audienceList]);

  const onSave = () => {
    mutate({
      audienceUsers: useAudienceStore.getState().audience,
      id: id as string,
    });
  };

  return (
    <>
      <AudienceListCard />
      <div className="tw-flex tw-justify-between">
        <div className="tw-flex tw-gap-4">
          <Button label="Send Notif" />
        </div>
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
