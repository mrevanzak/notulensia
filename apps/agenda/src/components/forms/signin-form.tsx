"use client";
import type { SignInFormValues } from "@/lib/validations/auth";
import { authSchema } from "@/lib/validations/auth";
import Link from "next/link";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { ApiError } from "@/types/api";
import { useSignIn } from "@/lib/api/auth/sign-in";
import { v4 } from "uuid";

export default function SignInForm(): ReactElement {
  const { mutate, isPending, isError, error } = useSignIn();
  const errorMessages = (): string | undefined => {
    if (error instanceof ApiError) {
      return error.stringify();
    }
  };

  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(authSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    mutate({ ...data, deviceId: v4() });
  });

  return (
    <div
      className="tw-p-24 tw-rounded-[20px]"
      style={{
        background: isError
          ? "rgba(218, 97, 97, 0.35)"
          : "linear-gradient(135.59deg, rgba(88, 130, 193, 0.49) 1.28%, rgba(88, 130, 193, 0.11) 96.26%),linear-gradient(0deg, rgba(88, 130, 193, 0.28), rgba(88, 130, 193, 0.28))",
      }}
    >
      <h2 className="tw-text-white tw-text-center">Sign In</h2>
      <p className="p-error tw-text-center tw-mt-1">
        {isError ? errorMessages() : null}
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

          <Link
            className="tw-text-white tw-flex tw-justify-end tw-text-sm"
            href="#"
          >
            Forgot Password?
          </Link>

          <Button
            className="w-full !tw-p-4 !tw-mt-8"
            label="Login"
            loading={isPending}
            severity="secondary"
            type="submit"
          />
        </form>
      </FormProvider>
    </div>
  );
}
