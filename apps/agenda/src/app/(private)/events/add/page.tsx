import EventForm from "@/components/forms/event-form";
import type { ReactElement } from "react";
import React from "react";

export default function AddEvent(): ReactElement {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card bg-purple-50 tw-space-y-3">
          <h2>Add Event</h2>
          <div className="tw-border-b-2 tw-border-dark-purple" />
          <EventForm />
        </div>
      </div>
    </div>
  );
}
