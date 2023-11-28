"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import { Button } from "primereact/button";
import { useParams, useRouter } from "next/navigation";
import { useGetEventCategoryDetail } from "@/lib/api/event-category/get-event-category-detail";
import type { EventCategoryFormValues } from "@/lib/validations/event-category";
import { eventCategoryFormSchema } from "@/lib/validations/event-category";
import { useInsertEventCategory } from "@/lib/api/event-category/insert-event-category";
import { useUpdateEventCategory } from "@/lib/api/event-category/update-event-category";

type EventCategoryFormProps = {
  edit?: boolean;
};

export default function EventCategoryForm({
  edit = false,
}: EventCategoryFormProps): ReactElement {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const { data: values } = useGetEventCategoryDetail(id);

  const insertEventCategory = useInsertEventCategory();
  const updateEventCategory = useUpdateEventCategory();
  const methods = useForm<EventCategoryFormValues>({
    resolver: zodResolver(eventCategoryFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    edit
      ? updateEventCategory.mutate({
          ...data,
          id,
        })
      : insertEventCategory.mutate(data);
  });

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <Input
          className="tw-w-full"
          id="eventCategoryName"
          label="Event Category Name"
        />

        <div className="tw-flex tw-justify-end tw-gap-2 tw-w-full tw-ms-auto tw-mt-8">
          <Button
            className="tw-w-fit !tw-py-2 !tw-px-8"
            label="Submit"
            loading={
              edit
                ? updateEventCategory.isPending
                : insertEventCategory.isPending
            }
            type="submit"
          />
          <Button
            className="tw-w-fit !tw-py-2 !tw-px-8"
            label="Cancel"
            onClick={() => {
              router.back();
            }}
            outlined
            severity="secondary"
            type="button"
          />
        </div>
      </form>
    </FormProvider>
  );
}
