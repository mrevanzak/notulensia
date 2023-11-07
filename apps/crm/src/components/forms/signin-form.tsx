"use client";
import type { SignInFormValues } from "@/lib/validations/auth";
import { authSchema } from "@/lib/validations/auth";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { useSignIn } from "@/lib/api/auth/sign-in";
import { errorMessages } from "@/lib/error";
import Logo from "~/svg/logo.svg";

export default function SignInForm(): ReactElement {
  const { mutate, isPending, isError, error } = useSignIn();

  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(authSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    mutate({ ...data });
  });

  return (
    <div className="tw-w-1/3">
      <Logo className="tw-w-72 tw-mx-auto" />
      <p className="p-error tw-text-center tw-mt-1">
        {isError ? errorMessages(error) : null}
      </p>
      <FormProvider {...methods}>
        <form
          className="tw-space-y-4 tw-mt-8"
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit();
          }}
        >
          <Input icon="pi-at" id="email" label="Email" />
          <Input id="password" label="Password" type="password" />

          <Button
            className="w-full !tw-p-2 !tw-mt-8"
            label="Login"
            loading={isPending}
            type="submit"
          />
        </form>
      </FormProvider>
    </div>
  );
}
