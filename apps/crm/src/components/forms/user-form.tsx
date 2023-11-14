"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import { useInsertUser } from "@/lib/api/user/insert-user";
import Switch from "../ui/switch";
import type { UserFormValues } from "@/lib/validations/user";
import { userFormSchema } from "@/lib/validations/user";
import { useParams, useRouter } from "next/navigation";
import { useGetUserDetail } from "@/lib/api/user/get-user-detail";
import MultiStateCheckbox from "../ui/multi-state-checkbox";
import { useUpdateUser } from "@/lib/api/user/update-user";
import Dropdown from "../ui/dropdown";
import { useGetTierDropdown } from "@/lib/api/tier/get-tier-dropdown";

type UserFormProps = {
  setShowDialog?: (showDialog: boolean) => void;
  edit?: boolean;
};

export default function UserForm({
  setShowDialog,
  edit = false,
}: UserFormProps): ReactElement {
  const router = useRouter();
  const { id } = useParams();

  const { data } = useGetUserDetail(id as string);
  const tier = useGetTierDropdown();
  const insertUser = useInsertUser();
  const updateUser = useUpdateUser();

  const methods = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    values: {
      name: data?.name ?? "",
      email: data?.email ?? "",
      phoneNumber: data?.phoneNumber ?? "",
      isCrmUser: false,
      password: "",
      status: data?.status ?? "ACTIVE",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    edit
      ? updateUser.mutate(
          {
            ...data,
            id: id as string,
          },
          {
            onSuccess: () => {
              setShowDialog && setShowDialog(false);
            },
          },
        )
      : insertUser.mutate(data, {
          onSuccess: () => {
            setShowDialog && setShowDialog(false);
          },
        });
  });

  const options = [
    { value: "ACTIVE", icon: "pi pi-check" },
    {
      value: "SUSPEND",
      icon: "pi pi-times",
      className: "!tw-bg-red-500 !tw-border-red-500",
    },
    {
      value: "DEMO",
      icon: "pi pi-question",
      className: "!tw-bg-yellow-500 !tw-border-yellow-500",
    },
  ];

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <Input id="name" label="Full Name" />
        <Input id="phoneNumber" label="Phone Number" />
        <Input id="email" label="Email" type="email" />
        <Input id="password" label="Password" type="password" />
        {edit ? <Dropdown
            filter
            id="tierId"
            label="Features"
            loading={tier.isLoading}
            optionLabel="name"
            optionValue="id"
            options={tier.data}
          /> : null}
        {!edit ? (
          <Switch className="!tw-mt-6" id="isCrmUser" label="CRM User" />
        ) : (
          <MultiStateCheckbox
            empty={false}
            id="status"
            label="Status"
            options={options}
          />
        )}

        <div className="tw-flex tw-gap-2 !tw-mt-8">
          <Button
            className="tw-w-1/2 !tw-py-2 !tw-px-8"
            label="Save"
            loading={insertUser.isPending || updateUser.isPending}
            type="submit"
          />
          <Button
            className="tw-w-1/2 !tw-py-2 !tw-px-8"
            label="Cancel"
            onClick={() => {
              setShowDialog && setShowDialog(false);
              edit && router.back();
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
