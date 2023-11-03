"use client";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import type { EventFormValues } from "@/lib/validations/event";
import { insertEventFormSchema } from "@/lib/validations/event";
import TextArea from "@/components/ui/textarea";
import { Button } from "primereact/button";
import Checkbox from "@/components/ui/checkbox";
import CalendarInput from "@/components/ui/calendar-input";
import { useInsertEvent } from "@/lib/api/event/insert-event";
import Dropdown from "../ui/dropdown";
import { useGetProvince } from "@/lib/api/province/get-province";
import { useGetDistrict } from "@/lib/api/district/get-district-by-province";
import { useGetEventCategoryDropdown } from "@/lib/api/event-category/get-event-category";
import Chips from "../ui/chips";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useScheduleProgramStore } from "@/stores/use-schedule-program-store";
import { Dialog } from "primereact/dialog";
import AddScheduleProgramForm from "./add-schedule-program-form";
import type { ScheduleProgram } from "@/lib/validations/schedule-program";
import { FileUpload } from "primereact/fileupload";
import { useGetEventDetail } from "@/lib/api/event/get-event-detail";
import { useUpdateEvent } from "@/lib/api/event/update-event";
import { useParams } from "next/navigation";

type EventFormProps = {
  edit?: boolean;
};

export default function EventForm({ edit }: EventFormProps): ReactElement {
  const { id } = useParams();
  const { data } = useGetEventDetail(id as string);

  const [showDialog, setShowDialog] = useState(false);

  const insertEvent = useInsertEvent();
  const updateEvent = useUpdateEvent();
  const methods = useForm<EventFormValues>({
    resolver: zodResolver(insertEventFormSchema),
    defaultValues: {
      isOnline: false,
    },
    values: {
      eventCategoryName: data?.eventCategoryName ?? "",
      name: data?.name ?? "",
      topic: data?.topic ?? "",
      purpose: data?.purpose ?? "",
      preparationNotes: data?.preparationNotes ?? "",
      startAt: new Date(data?.startAt ?? ""),
      endAt: new Date(data?.endAt ?? ""),
      isOnline: data?.isOnline ?? false,
      linkUrl: data?.linkUrl ?? "",
      province: data?.province
        ? { id: "", province: data.province, code: data.provinceCode ?? 0 }
        : undefined,
      district: data?.district
        ? {
            id: "",
            district: data.district,
            code: data.districtCode ?? 0,
            province: data.province ?? "",
          }
        : undefined,
      address: data?.address ?? "",
      locationValue: data?.locationValue ?? "",
      audienceNames: data?.audiences?.map((audience) => audience.audienceName),
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
          eventCategoryName:
            typeof data.eventCategoryName === "string"
              ? data.eventCategoryName
              : data.eventCategoryName?.eventCategoryName,
          province: data.province?.province,
          provinceCode: data.province?.code,
          district: data.district?.district,
          districtCode: data.district?.code,
          schedules: scheduleProgram,
          status: "ACTIVE",
        })
      : insertEvent.mutate({
          ...data,
          eventCategoryName:
            typeof data.eventCategoryName === "string"
              ? data.eventCategoryName
              : data.eventCategoryName?.eventCategoryName,
          province: data.province?.province,
          provinceCode: data.province?.code,
          district: data.district?.district,
          districtCode: data.district?.code,
          schedules: scheduleProgram,
          status: "ACTIVE",
        });
  });

  const eventCategory = useGetEventCategoryDropdown();
  const province = useGetProvince();
  const district = useGetDistrict(watch("province")?.province);

  const scheduleProgram = useScheduleProgramStore(
    (state) => state.scheduleProgram,
  );
  const reset = useScheduleProgramStore((state) => state.reset);
  const setScheduleProgram = useScheduleProgramStore((state) => {
    return state.set;
  });
  const removeScheduleProgram = useScheduleProgramStore(
    (state) => state.remove,
  );

  useEffect(() => {
    reset();
    if (data?.schedules) {
      setScheduleProgram(data.schedules);
    }
  }, [data]);

  const columns = [
    { field: "date", header: "Date" },
    { field: "activity", header: "Activity" },
    { field: "startTime", header: "Start Time" },
    { field: "endTime", header: "End Time" },
    { field: "picName", header: "PIC Name" },
    { field: "note", header: "Note" },
    { field: "action", header: "Action" },
  ];

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
            emptyMessage="Please add schedule program"
            value={scheduleProgram}
          >
            {columns.map((col) => (
              <Column
                body={col.field === "action" && actionBodyTemplate}
                field={col.field}
                header={col.header}
                key={col.field}
              />
            ))}
            <Column rowEditor />
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
            <Button label="Draft" outlined type="submit" />
            <Button label="Send Notif" />
          </div>
          <div className="tw-flex tw-gap-4">
            <Button
              label="Save"
              loading={insertEvent.isPending}
              outlined
              type="submit"
            />
            <Button label="Cancel" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
