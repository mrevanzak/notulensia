"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import { Button } from "primereact/button";
import { useParams, useRouter } from "next/navigation";
import { useGetDistrictDetail } from "@/lib/api/district/get-district-detail";
import { useUpdateDistrict } from "@/lib/api/district/update-district";
import type { DistrictFormValues } from "@/lib/validations/district";
import { districtFormSchema } from "@/lib/validations/district";
import { useInsertDistrict } from "@/lib/api/district/insert-district";

type DistrictFormProps = {
  edit?: boolean;
};

export default function DistrictForm({
  edit = false,
}: DistrictFormProps): ReactElement {
  const router = useRouter();
  const { id } = useParams();

  const { data: values } = useGetDistrictDetail(id as string);

  const insertDistrict = useInsertDistrict();
  const updateDistrict = useUpdateDistrict();
  const methods = useForm<DistrictFormValues>({
    resolver: zodResolver(districtFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    edit
      ? updateDistrict.mutate({
          ...data,
          id: id as string,
        })
      : insertDistrict.mutate(data);
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
        {/* <Dropdown */}
        {/*   filter */}
        {/*   float */}
        {/*   id="province" */}
        {/*   label="Province" */}
        {/*   loading={province.isLoading} */}
        {/*   optionLabel="province" */}
        {/*   options={province.data} */}
        {/* /> */}
        <Input className="tw-w-1/2" id="code" keyfilter="int" label="Code" />
        <Input className="tw-w-1/2" id="name" label="District" />

        <div className="tw-flex tw-justify-end tw-gap-2 tw-w-full tw-ms-auto tw-mt-8">
          <Button
            className="tw-w-fit !tw-py-2 !tw-px-8"
            label="Submit"
            loading={edit ? updateDistrict.isPending : insertDistrict.isPending}
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
