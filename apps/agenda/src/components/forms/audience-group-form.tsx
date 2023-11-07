"use client";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Audience, AudienceFormValues } from "@/lib/validations/audience";
import { audienceGroupFormSchema } from "@/lib/validations/audience";
import TextArea from "../ui/textarea";
import { useAudienceStore } from "@/stores/use-audience-store";
import { useGetAudienceDetail } from "@/lib/api/audience/get-audience-detail";
import { useInsertAudience } from "@/lib/api/audience/insert-audience";
import { useUpdateAudience } from "@/lib/api/audience/update-audience";
import AddAudienceForm from "./add-audience-form";

type AudienceGroupFormProps = {
  edit?: boolean;
};

export default function AudienceGroupForm({
  edit,
}: AudienceGroupFormProps): ReactElement {
  const { id } = useParams();
  const { data: values } = useGetAudienceDetail(id as string);

  const [showDialog, setShowDialog] = useState(false);

  const insertAudience = useInsertAudience();
  const updateAudience = useUpdateAudience();
  const methods = useForm<AudienceFormValues>({
    resolver: zodResolver(audienceGroupFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    edit
      ? updateAudience.mutate({
          ...data,
          id: id as string,
          audiences: audience,
        })
      : insertAudience.mutate({
          ...data,
          audiences: audience,
        });
  });

  const audience = useAudienceStore((state) => state.audience);
  const reset = useAudienceStore((state) => state.reset);
  const setAudience = useAudienceStore((state) => {
    return state.set;
  });
  const removeAudience = useAudienceStore((state) => state.remove);

  useEffect(() => {
    reset();
    if (values?.audiences) {
      setAudience(values.audiences);
    }
  }, [values]);

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
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 !tw-my-8"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <Input float id="name" label="Name" />
        <TextArea float id="description" label="Description" />
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
            <h4>List Audience</h4>
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
              <Button outlined>Import</Button>
            </div>
          </div>
          <DataTable emptyMessage="Please add audience" value={audience}>
            <Column field="name" header="Name" />
            <Column field="job" header="Job" />
            <Column field="phoneNumber" header="Phone Number" />
            <Column field="email" header="Email" />
            <Column body={actionBodyTemplate} header="Action" />
          </DataTable>
        </div>
        <div className="tw-flex tw-gap-4 tw-justify-end">
          <Button
            label="Save"
            loading={insertAudience.isPending}
            outlined
            type="submit"
          />
          <Link href="/audience-group">
            <Button label="Cancel" type="button" />
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
