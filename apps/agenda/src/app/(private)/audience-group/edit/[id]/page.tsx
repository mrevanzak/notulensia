import AudienceGroupForm from "@/components/forms/audience-group-form";
import type { ReactElement } from "react";
import React from "react";

export default function EditAudienceGroupPage(): ReactElement {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card bg-purple-50 tw-space-y-3">
          <h2>Edit Audience Group</h2>
          <div className="tw-border-b-2 tw-border-dark-purple" />
          <AudienceGroupForm edit />
        </div>
      </div>
    </div>
  );
}
