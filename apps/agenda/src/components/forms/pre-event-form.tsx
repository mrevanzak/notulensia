"use client";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import type { EventFormValues } from "@/lib/validations/event";
import { eventFormSchema } from "@/lib/validations/event";
import TextArea from "@/components/ui/textarea";
import { Button } from "primereact/button";
import CalendarInput from "@/components/ui/calendar-input";
import type { EventStatus } from "@/lib/api/event/insert-event";
import { useInsertEvent } from "@/lib/api/event/insert-event";
import Dropdown from "../ui/dropdown";
import { useGetProvince } from "@/lib/api/province/get-province";
import { useGetDistrict } from "@/lib/api/district/get-district-by-province";
import { useGetEventCategoryDropdown } from "@/lib/api/event-category/get-event-category";
import { DataTable } from "primereact/datatable";
import type { ColumnEditorOptions, ColumnEvent } from "primereact/column";
import { Column } from "primereact/column";
import { useScheduleProgramStore } from "@/stores/use-schedule-program-store";
import { Dialog } from "primereact/dialog";
import AddScheduleProgramForm from "./add-schedule-program-form";
import type { ScheduleProgram } from "@/lib/validations/schedule-program";
import { useGetEventDetail } from "@/lib/api/event/get-event-detail";
import { useUpdateEvent } from "@/lib/api/event/update-event";
import { useParams } from "next/navigation";
import moment from "moment";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import AutoComplete from "../ui/autocomplete";
import { useGetAudienceDropdown } from "@/lib/api/audience/get-audience-dropdown";
import AudienceListCard from "../audience-list-card";
import { useAudienceStore } from "@/stores/use-audience-store";
import type { AudienceDropdown } from "@/lib/validations/audience";
import { useGetAudienceDetail } from "@/lib/api/audience/get-audience-detail";
import { useGetEventAddressDropdown } from "@/lib/api/event-address/get-event-address-dropdown";
import { useInsertEventAddress } from "@/lib/api/event-address/insert-event-address";
import AttachmentFilesCard from "@/components/attachment-files-card";
import { InputSwitch } from "primereact/inputswitch";
import { useCreateLinkMeet } from "@/lib/api/event/create-link-meet";
import { getLocalISODateTime } from "@/utils/date-utils";
import { v4 } from "uuid";
import iconMeet from "~/svg/google-meet.svg"

type EventFormProps = {
  edit?: boolean;
};

type RouteParams = Record<string, string>;

export default function PreEventForm({ edit }: EventFormProps): ReactElement {
  const params = useParams<RouteParams>();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id ?? "";

  const { data: values } = useGetEventDetail(id);

  const [showDialog, setShowDialog] = useState(false);
  const [eventState, setEventState] = useState<EventStatus>("ACTIVE");
  const [isOnline, setIsOnline] = useState(values?.isOnline !== undefined && values.isOnline !== null ? values.isOnline : false);

  const insertEvent = useInsertEvent();
  const updateEvent = useUpdateEvent();
  const methods = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit, watch, resetField, setValue, getValues, control } =
    methods;
  const { replace } = useFieldArray({
    control,
    name: "files",
  });

  const onSubmit = handleSubmit((data) => {
    if (isOnline) {
      resetField("province");
      resetField("district");
      resetField("address");
    } else {
      resetField("linkUrl");
    }
    edit
      ? updateEvent.mutate({
          ...data,
          id,
          schedules: scheduleProgram,
          status: eventState,
          isOnline : isOnline !== undefined && isOnline !== null ? isOnline : false,
          audienceUsers: useAudienceStore.getState().audience,
        })
      : insertEvent.mutate({
          ...data,
          schedules: scheduleProgram,
          status: eventState,
          isOnline : isOnline !== undefined && isOnline !== null ? isOnline : false,
          audienceUsers: useAudienceStore.getState().audience,
        });
  });

  const eventAddress = useGetEventAddressDropdown();
  const watchLocationValue = watch("locationValue");
  useEffect(() => {
    setValue(
      "province",
      eventAddress.data?.find((item) => item.location === watchLocationValue)
        ?.provinceName,
    );
    setValue(
      "district",
      eventAddress.data?.find((item) => item.location === watchLocationValue)
        ?.districtName,
    );
    setValue(
      "address",
      eventAddress.data?.find((item) => item.location === watchLocationValue)
        ?.address,
    );
  }, [watchLocationValue]);

  const insertEventAddressPreset = useInsertEventAddress();

  const eventCategory = useGetEventCategoryDropdown();
  const province = useGetProvince();
  const district = useGetDistrict(watch("province"));
  const audienceDropdown = useGetAudienceDropdown();
  const [audienceFilter, setAudienceFilter] = useState<AudienceDropdown[]>();

  const audienceIds = watch("audienceNames")?.map((item) => item.id);
  const audienceList = useGetAudienceDetail(audienceIds);
  const loadingAudienceList = audienceList.some((item) => item.isLoading);
  const audiences = audienceList.flatMap((item) => item.data?.audiences ?? []);

  const setAudience = useAudienceStore((state) => state.set);
  const addAudience = useAudienceStore((state) => state.add);

  useEffect(() => {
    if (!loadingAudienceList) {
      addAudience(audiences);
    }
  }, [audiences.length]);

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
    if (values?.files) {
      replace(values.files);
    }
    if (values?.audienceUsers) {
      setAudience(values.audienceUsers);
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

  const createLinkMeet = () => {
    const auth = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount';
    const queryParams = {
      client_id: '898862951743-ort2u42i3kgdfuhsf9jn1ffi9a39embv.apps.googleusercontent.com',
      redirect_uri: 'http://localhost:3000/events/callback',
      scope : 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
      prompt : 'select_account',
      response_type : 'token',
      include_granted_scopes: true,
      enable_granular_consent:true,
    };
    const queryString = Object.keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    const url = `${auth}?${queryString}`;
    const newWindow = window.open(url, '_blank');

    if (newWindow) {
      newWindow.focus();
    }
  };

  const [accessToken, setAccessToken] = useState(localStorage.getItem('googleAccessToken'));
  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem('googleAccessToken'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const createLink  = useCreateLinkMeet();
  function convertToISOString(date: string | Date): string {
    return typeof date === 'string' ? date : new Date(date).toISOString();
  }
  useEffect(() => {
     if (accessToken) {
      createLink.mutate({
        startAt: values?.startAt ? getLocalISODateTime(values?.startAt) + ".000Z" : "",
        endAt: values?.endAt ? getLocalISODateTime(values?.endAt) + ".000Z" : "",
        eventName: values?.name ? values.name : "",
        description: values?.topic ? values.topic : "",
        reqId: v4(),
        token: accessToken,
        users: values?.audienceUsers ? values.audienceUsers.map(p => p.email) : [],
      })
      localStorage.removeItem('googleAccessToken');
    }
  }, [accessToken]);

  if(createLink.data?.link){
    setValue("linkUrl", createLink.data?.link);
  }

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-my-8 tw-pt-4"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <Dropdown
          float
          id="eventCategoryName"
          label="Event Category"
          loading={eventCategory.isLoading}
          optionLabel="eventCategoryName"
          optionValue="eventCategoryName"
          options={eventCategory.data}
          required
        />
        <Input float id="name" label="Event Name" required/>
        <Input float id="topic" label="Topic" required/>
        <Input float id="purpose" label="Purpose" required/>
        <TextArea float id="preparationNotes" label="Preparation Notes" />
        <div className="tw-flex tw-gap-8">
          <CalendarInput float icon id="startAt" label="Start Date" required showTime/>
          <CalendarInput float icon id="endAt" label="End Date" required showTime/>
        </div>

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
        <AutoComplete
          completeMethod={(e) => {
            if (!audienceDropdown.data) return [];

            setAudienceFilter(
              audienceDropdown.data.filter((item) => {
                return item.audienceName
                  .toLowerCase()
                  .includes(e.query.toLowerCase());
              }),
            );
          }}
          field="audienceName"
          float
          forceSelection
          id="audienceNames"
          label="Audience Group"
          multiple
          suggestions={audienceFilter}
        />
        <AudienceListCard />
        <AttachmentFilesCard />

        <div className="tw-flex tw-gap-2">
          <InputSwitch checked={isOnline} className="tw-mb-4 tw-ml-2"  id="isOnline" onChange={(e) => {setIsOnline(e.value)}} />
          <span>Via Online</span>
        </div>
        
        {isOnline ? (
          <div className="p-inputgroup">
            <Input float id="linkUrl" label="Online Link"  />
            <Button
            className="tw-h-auto"
              icon={iconMeet}
              loading={createLink.isPending}
              onClick={() => {createLinkMeet()}}
              outlined
              size="small"
              type="button"
            />
            {/* <Button
            className="tw-h-auto"
              icon={() => <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="20" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="#2196f3"></circle><path fill="#fff" d="M29,31H14c-1.657,0-3-1.343-3-3V17h15c1.657,0,3,1.343,3,3V31z"></path><polygon fill="#fff" points="37,31 31,27 31,21 37,17"></polygon>
              </svg> }
              onClick={(e) => {}}
              outlined
            /> */}
          </div>
        ) : (
          <>
          <div className="tw-relative">
            <Button
              className="tw-absolute tw-bottom-12 tw-right-0"
              label="Save as preset"
              onClick={() => {
                insertEventAddressPreset.mutate({
                  address: getValues("address"),
                  districtId: district.data?.find(
                    (item) => item.district === getValues("district"),
                  )?.id,
                  location: getValues("locationValue"),
                  provinceId: province.data?.find(
                    (item) => item.province === getValues("province"),
                  )?.id,
                });
              }}
              outlined
              type="button"
            />
            <Dropdown
              editable
              float
              id="locationValue"
              label="Location"
              loading={eventAddress.isLoading}
              optionLabel="location"
              optionValue="location"
              options={eventAddress.data}
            />
          </div>
            <Dropdown
              filter
              float
              id="province"
              label="Province"
              loading={province.isLoading}
              optionLabel="province"
              optionValue="province"
              options={province.data}
            />
            <Dropdown
              filter
              float
              id="district"
              label="District"
              loading={district.isLoading}
              optionLabel="district"
              optionValue="district"
              options={district.data}
            />
            <TextArea float id="address" label="Address" />
          </>
        )}

        <div className="tw-flex tw-justify-between">
          <div className="tw-flex tw-gap-4">
            {values?.status !== "ACTIVE" && (
              <Button
                label="Draft"
                onClick={() => {
                  setEventState("DRAFT");
                }}
                outlined
                type="submit"
              />
            )}
            { (edit && (values && values.status !== "DRAFT")) ? 
                <Button label="Send Notif" /> : null
            }
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
