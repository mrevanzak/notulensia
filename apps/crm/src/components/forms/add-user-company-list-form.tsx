import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../ui/input";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import type { UserFormValues } from "@/lib/validations/company";
import { userFormSchema } from "@/lib/validations/company";
import { useInsertUser } from "@/lib/api/user/insert-user";
import Switch from "../ui/switch";

type AddUserCompanyListProps = {
  setShowDialog: (showDialog: boolean) => void;
};

export default function AddUserCompanyList({
  setShowDialog,
}: AddUserCompanyListProps): ReactElement {
  const { mutate, isPending } = useInsertUser();

  const methods = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
  });

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        setShowDialog(false);
      },
    });
  });

  return (
    <>
      <div className="tw-flex tw-items-center tw-justify-center tw-flex-col tw-gap-4 tw-pb-4">
        <i
          className="pi pi-user-plus text-primary"
          style={{ fontSize: "5rem" }}
        />
        <p className="tw-text-2xl tw-font-bold">Add New User</p>
      </div>
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
          <Switch className="!tw-mt-6" id="isCrmUser" label="CRM User" />
          <div className="tw-flex tw-gap-2 !tw-mt-8">
            <Button
              className="tw-w-1/2 !tw-py-2 !tw-px-8"
              label="Save"
              loading={isPending}
              type="submit"
            />
            <Button
              className="tw-w-1/2 !tw-py-2 !tw-px-8"
              label="Cancel"
              onClick={() => {
                setShowDialog(false);
              }}
              outlined
              severity="secondary"
              type="button"
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
