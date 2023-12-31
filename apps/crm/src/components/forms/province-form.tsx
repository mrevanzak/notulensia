"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import { Button } from "primereact/button";
import { useParams, useRouter } from "next/navigation";
import { useGetProvinceDetail } from "@/lib/api/province/get-province-detail";
import { useUpdateProvince } from "@/lib/api/province/update-province";
import type { ProvinceFormValues } from "@/lib/validations/province";
import { provinceFormSchema } from "@/lib/validations/province";
import { useInsertProvince } from "@/lib/api/province/insert-province";

type ProvinceFormProps = {
  edit?: boolean;
};

export default function ProvinceForm({
  edit = false,
}: ProvinceFormProps): ReactElement {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const { data: values } = useGetProvinceDetail(id);

  const insertProvince = useInsertProvince();
  const updateProvince = useUpdateProvince();
  const methods = useForm<ProvinceFormValues>({
    resolver: zodResolver(provinceFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    edit
      ? updateProvince.mutate({
          ...data,
          id,
        })
      : insertProvince.mutate(data);
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
        <Input className="tw-w-1/2" id="code" keyfilter="int" label="Code" />
        <Input className="tw-w-1/2" id="name" label="Province" />

        <div className="tw-flex tw-justify-end tw-gap-2 tw-w-full tw-ms-auto tw-mt-8">
          <Button
            className="tw-w-fit !tw-py-2 !tw-px-8"
            label="Submit"
            loading={edit ? updateProvince.isPending : insertProvince.isPending}
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
