"use client";
import type { Audience } from "@/lib/validations/audience";
import { Button } from "primereact/button";
import type { ColumnEditorOptions, ColumnEvent } from "primereact/column";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useAudienceStore } from "@/stores/use-audience-store";
import React, { useEffect, useState } from "react";
import AddAudienceForm from "./forms/add-audience-form";
import { useExportAudience } from "@/lib/api/export/export-audience";
import { useParams } from "next/navigation";
import ExportButton from "./export-button";

export default function AudienceListCard() {
  const params = useParams<{ id: string }>();
  const eventId = params?.id ?? "";

  const [showDialog, setShowDialog] = useState(false);

  const audience = useAudienceStore((state) => state.audience);
  const removeAudience = useAudienceStore((state) => state.remove);
  const reset = useAudienceStore((state) => state.reset);

  const exportAudience = useExportAudience(eventId);

  useEffect(() => {
    reset();
  }, []);

  const onCellEditComplete = (e: ColumnEvent) => {
    const { rowData, newValue, field, originalEvent: event } = e;
    rowData[field] = newValue;
    event.preventDefault();
  };
  const textEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        onChange={(e) => {
          options.editorCallback && options.editorCallback(e.target.value);
        }}
        type="text"
        value={options.value}
      />
    );
  };
  const checkboxEditor = (options: ColumnEditorOptions) => {
    return (
      <Checkbox
        checked={options.value}
        onChange={(e) => {
          options.editorCallback && options.editorCallback(e.target.checked);
        }}
      />
    );
  };

  const actionBodyTemplate = (rowData: Audience) => {
    return (
      <Button
        icon="pi pi-trash"
        onClick={() => {
          removeAudience(rowData.name);
        }}
        severity="danger"
      />
    );
  };
  return (
    <div className="card tw-space-y-3">
      <Dialog
        className="tw-w-96"
        draggable={false}
        header="Add Audience"
        onHide={() => {
          setShowDialog(false);
        }}
        pt={{
          content: {
            className: "border-noround-top pt-5 tw-space-y-8",
          },
        }}
        visible={showDialog}
      >
        <AddAudienceForm setShowDialog={setShowDialog} />
      </Dialog>
      <div className="tw-flex tw-justify-between tw-items-center">
        <h4>Audience List</h4>
        <div className="tw-space-x-4">
          <Button
            icon="pi pi-plus"
            iconPos="right"
            label="Add"
            onClick={() => {
              setShowDialog(true);
            }}
            type="button"
          />
          <ExportButton action={exportAudience.mutate} outlined />
        </div>
      </div>
      <DataTable
        editMode="cell"
        emptyMessage="Please add audience"
        value={audience}
      >
        <Column
          editor={(options) => textEditor(options)}
          field="name"
          header="Name"
          headerStyle={{ width: "20%" }}
          onCellEditComplete={onCellEditComplete}
        />
        <Column
          editor={(options) => textEditor(options)}
          field="job"
          header="Job"
          headerStyle={{ width: "20%" }}
          onCellEditComplete={onCellEditComplete}
        />
        <Column
          editor={(options) => textEditor(options)}
          field="description"
          header="Description"
          headerStyle={{ width: "20%" }}
          onCellEditComplete={onCellEditComplete}
        />
        <Column
          editor={(options) => textEditor(options)}
          field="phoneNumber"
          header="Phone Number"
          headerStyle={{ width: "20%" }}
          onCellEditComplete={onCellEditComplete}
        />
        <Column
          editor={(options) => textEditor(options)}
          field="email"
          header="Email"
          headerStyle={{ width: "20%" }}
          onCellEditComplete={onCellEditComplete}
        />
        <Column
          body={(rowData: Audience) => {
            return rowData.isAttend ? "Yes" : "No";
          }}
          editor={(options) => checkboxEditor(options)}
          field="isAttend"
          header="Attend"
          headerStyle={{ width: "2rem" }}
          onCellEditComplete={onCellEditComplete}
        />
        <Column
          body={actionBodyTemplate}
          header="Action"
          headerStyle={{ width: "2rem" }}
        />
      </DataTable>
    </div>
  );
}
