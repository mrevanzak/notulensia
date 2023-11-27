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
import { FileUpload } from "primereact/fileupload";

export default function PostEventForm(): ReactElement {
  const { id } = useParams();
  const { data } = useGetEventDetail(id as string);
  const { mutate, isPending } = useUpdateOngoingEvent();

  const setAudience = useAudienceStore((state) => state.set);

  useEffect(() => {
    setAudience(data?.audienceUsers ?? []);
  }, [data]);

  const onSave = () => {
    mutate({
      audienceUsers: useAudienceStore.getState().audience,
      id: id as string,
    });
  };

  return (
    <>
      <AudienceListCard />
      <FileUpload
        accept="image/*"
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
        maxFileSize={1000000}
        multiple
        name="demo[]"
        url="/api/upload"
      />

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
