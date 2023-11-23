import type { ReactElement } from "react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { Button } from "primereact/button";
import type { Audience } from "@/lib/validations/audience";
import { audienceFormSchema } from "@/lib/validations/audience";
import { useAudienceStore } from "@/stores/use-audience-store";

type AddAudienceFormProps = {
  setShowDialog: (value: boolean) => void;
};

export default function AddAudienceForm({
  setShowDialog,
}: AddAudienceFormProps): ReactElement {
  const addAudience = useAudienceStore((state) => state.add);

  const methods = useForm<Audience>({
    resolver: zodResolver(audienceFormSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    addAudience(data);
    setShowDialog(false);
  });

  return (
    <FormProvider {...methods}>
      <form
        className="tw-space-y-8 "
        onSubmit={(event) => {
          event.stopPropagation();
          event.preventDefault();
          void onSubmit();
        }}
      >
        <Input float id="name" label="Name" />
        <Input float id="job" label="Job" />
        <Input float id="description" label="Description" />
        <Input float id="phoneNumber" label="Phone Number" />
        <Input float id="email" label="Email" />
        <div className="tw-flex tw-justify-center tw-gap-4">
          <Button
            className="px-4 py-2 tw-flex-none tw-w-32 tw-self-center"
            label="Submit"
            type="submit"
          />
          <Button
            className="px-4 py-2 tw-flex-none tw-w-32 tw-self-center"
            label="Cancel"
            onClick={() => {
              setShowDialog(false);
            }}
            severity="danger"
            type="button"
          />
        </div>
      </form>
    </FormProvider>
  );
}
