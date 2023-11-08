import EventForm from "@/components/forms/event-form";
import type { ReactElement } from "react";
import React from "react";

export default function AddEvent(): ReactElement {
  return (
    <div className="card bg-purple-50 tw-space-y-3 tw-min-h-[calc(100vh-4rem)]">
      <h2>Add Event</h2>
      <div className="tw-border-b-2 tw-border-dark-purple" />
      <EventForm />
    </div>
  );
}
