"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import { Button } from "primereact/button";
import { useInsertTier } from "@/lib/api/tier/insert-tier";
import type { Tier, TierFormValues } from "@/lib/validations/tier";
import { tierFormSchema, tierSchema } from "@/lib/validations/tier";
import { useParams, useRouter } from "next/navigation";
import { useUpdateTier } from "@/lib/api/tier/update-tier";
import { useGetTierDetail } from "@/lib/api/tier/get-tier-detail";

type FeaturesFormProps = {
  edit?: boolean;
};

export default function FeaturesForm({
  edit = false,
}: FeaturesFormProps): ReactElement {
  const router = useRouter();
  const { id } = useParams();
  const { data: values } = useGetTierDetail(id as string);

  const inserTier = useInsertTier();
  const updateTier = useUpdateTier();
  const methods = useForm<TierFormValues>({
    resolver: zodResolver(tierFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = handleSubmit((data) => {
    edit
      ? updateTier.mutate({ ...data, id: id as string })
      : inserTier.mutate(data);
  });
  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <Input id="name" label="Name" />
        <Input id="level" label="Level" />
        <Input id="price" label="Price" />
        <Input id="duration" label="Duration" />
        <Input id="status" label="Status" />
        <div className="tw-flex tw-justify-end tw-gap-2 tw-w-full tw-ms-auto tw-mt-8">
          <Button
            className="tw-w-fit !tw-py-2 !tw-px-8"
            label="Submit"
            loading={inserTier.isPending || updateTier.isPending}
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
