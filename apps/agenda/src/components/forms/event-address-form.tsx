"use client";
import React, { useState } from "react";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";
import { Button } from "primereact/button";
import type { EventStatus } from "@/lib/api/event/insert-event";
import Dropdown from "../ui/dropdown";
import { useGetProvince } from "@/lib/api/province/get-province";
import { useGetDistrict } from "@/lib/api/district/get-district-by-province";
import type { ColumnEvent } from "primereact/column";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetDetailEventAddress } from "@/lib/api/event-address/get-detail-event-address";
import { EventAddressForm, eventAddressFormSchema } from "@/lib/validations/event-address";
import { useInsertEventAddress } from "@/lib/api/event-address/insert-event-address";
import { useUpdateEventAddress } from "@/lib/api/event-address/update-event-address";

type EventAddressFormProps = {
  edit?: boolean;
};

export default function EventAddressForm({ edit }: EventAddressFormProps): ReactElement {

  const { id } = useParams();

  const { data: values } = useGetDetailEventAddress(id as string);

  const insertEventAddress = useInsertEventAddress();
  const updateEventAddress = useUpdateEventAddress();

  const methods = useForm<EventAddressForm>({
    resolver: zodResolver(eventAddressFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = handleSubmit((data) => {
    edit
      ? updateEventAddress.mutate({
          ...data,
          id : id as string
        })
      : insertEventAddress.mutate(data)
  });
  

  const province = useGetProvince();
  const district = useGetDistrict(watch("provinceId"));

  return (
    <FormProvider {...methods}>
        <form
        className="tw-space-y-8 !tw-my-8"
        onSubmit={(e) => {
        e.preventDefault();
        void onSubmit();
        }}
        >       
            <Input float id="location" label="Location"/>
            <Dropdown
            filter
            float
            id="provinceId"
            label="Province"
            loading={province.isLoading}
            optionLabel="province"
            optionValue="id"
            options={province.data}
            />
            <Dropdown
            filter
            float
            id="districtId"
            label="District"
            loading={district.isLoading}
            optionLabel="district"
            optionValue="id"
            options={district.data}
            />

            <TextArea float id="address" label="Address" />

            <div className="tw-flex tw-justify-between">
            <div className="tw-flex tw-gap-4">
                <Button
                label="Save"
                loading={edit ? updateEventAddress.isPending : insertEventAddress.isPending}
                outlined
                type="submit"
                />
                <Link href="/data-master/address">
                    <Button label="Cancel" type="button" />
                </Link>
            </div>
            </div>

        </form>

    </FormProvider>
  );
}
