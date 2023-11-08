"use client";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import type { EventFormValues } from "@/lib/validations/event";
import { eventFormSchema } from "@/lib/validations/event";
import TextArea from "@/components/ui/textarea";
import { Button } from "primereact/button";
import Checkbox from "@/components/ui/checkbox";
import CalendarInput from "@/components/ui/calendar-input";
import type { EventStatus } from "@/lib/api/event/insert-event";
import { useInsertEvent } from "@/lib/api/event/insert-event";
import Dropdown from "../ui/dropdown";
import { useGetProvince } from "@/lib/api/province/get-province";
import { useGetDistrict } from "@/lib/api/district/get-district-by-province";
import { useGetEventCategoryDropdown } from "@/lib/api/event-category/get-event-category";
import Chips from "../ui/chips";
import { DataTable } from "primereact/datatable";
import type { ColumnEditorOptions, ColumnEvent } from "primereact/column";
import { Column } from "primereact/column";
import { useScheduleProgramStore } from "@/stores/use-schedule-program-store";
import { Dialog } from "primereact/dialog";
import AddScheduleProgramForm from "./add-schedule-program-form";
import type { ScheduleProgram } from "@/lib/validations/schedule-program";
import { FileUpload } from "primereact/fileupload";
import { useGetEventDetail } from "@/lib/api/event/get-event-detail";
import { useUpdateEvent } from "@/lib/api/event/update-event";
import { useParams } from "next/navigation";
import moment from "moment";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

type EventFormProps = {
  edit?: boolean;
};

export default function EventForm({ edit }: EventFormProps): ReactElement {
  const { id } = useParams();
  const { data: values } = useGetEventDetail(id as string);

  const [showDialog, setShowDialog] = useState(false);
  const [eventState, setEventState] = useState<EventStatus>("ACTIVE");

  const insertEvent = useInsertEvent();
  const updateEvent = useUpdateEvent();
  const methods = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit, watch, resetField } = methods;
  const onSubmit = handleSubmit((data) => {
    if (data.isOnline) {
      resetField("province");
      resetField("district");
      resetField("address");
    } else {
      resetField("linkUrl");
    }
    edit
      ? updateEvent.mutate({
          ...data,
          id: id as string,
          schedules: scheduleProgram,
          status: eventState,
        })
      : insertEvent.mutate({
          ...data,
          schedules: scheduleProgram,
          status: eventState,
        });
  });

  const eventCategory = useGetEventCategoryDropdown();
  const province = useGetProvince();
  const district = useGetDistrict(watch("province"));

  const scheduleProgram = useScheduleProgramStore(
    (state) => state.scheduleProgram,
  );
  const reset = useScheduleProgramStore((state) => state.reset);
  const setScheduleProgram = useScheduleProgramStore((state) => state.set);
  const removeScheduleProgram = useScheduleProgramStore(
    (state) => state.remove,
  );

  const onCellEditComplete = (e: ColumnEvent) => {
    const { rowData, newValue, field, originalEvent: event } = e;
    rowData[field] = newValue;
    event.preventDefault();
  };
  const dateEditor = (options: ColumnEditorOptions) => {
    return (
      <Calendar
        dateFormat="dd-mm-yy"
        onChange={(e) => {
          options.editorCallback && options.editorCallback(e.target.value);
        }}
        value={options.value}
      />
    );
  };
  const timeEditor = (options: ColumnEditorOptions) => {
    return (
      <Calendar
        onChange={(e) => {
          options.editorCallback && options.editorCallback(e.target.value);
        }}
        timeOnly
        value={options.value}
      />
    );
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

  useEffect(() => {
    reset();
    if (values?.schedules) {
      setScheduleProgram(values.schedules);
    }
  }, [values]);

  const dateBodyTemplate = (rowData: ScheduleProgram) =>
    moment(rowData.date).format("DD-MM-YYYY");
  const actionBodyTemplate = (rowData: ScheduleProgram) => {
    return (
      <Button
        icon="pi pi-trash"
        onClick={() => {
          removeScheduleProgram(rowData.position);
        }}
        severity="danger"
      />
    );
  };
  const startTimeBodyTemplate = (rowData: ScheduleProgram) =>
    moment(rowData.startTime).format("HH:mm");
  const endTimeBodyTemplate = (rowData: ScheduleProgram) =>
    moment(rowData.endTime).format("HH:mm");

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-my-8"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <Dropdown
          editable
          float
          id="eventCategoryName"
          label="Event Category"
          loading={eventCategory.isLoading}
          optionLabel="eventCategoryName"
          options={eventCategory.data}
        />
        <Input float id="name" label="Event Name" />
        <Input float id="topic" label="Topic" />
        <Input float id="purpose" label="Purpose" />
        <TextArea float id="preparationNotes" label="Preparation Notes" />
        <div className="tw-flex tw-gap-8">
          <CalendarInput float icon id="startAt" label="Start Date" showTime />
          <CalendarInput float icon id="endAt" label="End Date" showTime />
        </div>
        <Checkbox id="isOnline" label="Via Online" />
        {watch("isOnline") ? (
          <Input float id="linkUrl" label="Online Link" />
        ) : (
          <>
            <Dropdown
              filter
              float
              id="province"
              label="Province"
              loading={province.isLoading}
              optionLabel="province"
              options={province.data}
            />
            <Dropdown
              filter
              float
              id="district"
              label="District"
              loading={district.isLoading}
              optionLabel="district"
              options={district.data}
            />
            <TextArea float id="address" label="Address" />
          </>
        )}
        <Input float id="locationValue" label="Location" />
        <div className="card tw-space-y-3">
          <Dialog
            className="tw-min-w-fit"
            draggable={false}
            header="Add Schedule Program"
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
            <AddScheduleProgramForm setShowDialog={setShowDialog} />
          </Dialog>
          <div className="tw-flex tw-justify-between tw-items-center">
            <h4>Schedule Program</h4>
            <Button
              icon="pi pi-plus"
              iconPos="right"
              label="Add"
              onClick={() => {
                setShowDialog(true);
              }}
              type="button"
            />
          </div>
          <DataTable
            editMode="cell"
            emptyMessage="Please add schedule program"
            value={scheduleProgram}
          >
            <Column
              body={dateBodyTemplate}
              editor={(options) => dateEditor(options)}
              field="date"
              header="Date"
              onCellEditComplete={onCellEditComplete}
              style={{ width: "15%" }}
            />
            <Column
              editor={(options) => textEditor(options)}
              field="activity"
              header="Activity"
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              body={startTimeBodyTemplate}
              editor={(options) => timeEditor(options)}
              field="startTime"
              header="Start Time"
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              body={endTimeBodyTemplate}
              editor={(options) => timeEditor(options)}
              field="endTime"
              header="End Time"
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              editor={(options) => textEditor(options)}
              field="picName"
              header="PIC Name"
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              editor={(options) => textEditor(options)}
              field="note"
              header="Note"
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              body={actionBodyTemplate}
              header="Action"
              headerStyle={{ width: "2rem" }}
            />
          </DataTable>
        </div>
        <Chips
          float
          helperText="Use comma (,) as separator"
          id="audienceNames"
          label="Audience Group"
        />
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
            <Button
              label="Draft"
              onClick={() => {
                setEventState("DRAFT");
              }}
              outlined
              type="submit"
            />
            <Button label="Send Notif" />
          </div>
          <div className="tw-flex tw-gap-4">
            <Button
              label="Save"
              loading={insertEvent.isPending}
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
