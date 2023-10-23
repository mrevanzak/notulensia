"use client";
import { authSchema } from "@/lib/validations/auth";
import Link from "next/link";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";

type SignInFormValues = z.infer<typeof authSchema>;

export default function SignInForm(): ReactElement {
  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(authSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
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
          severity="secondary"
          type="submit"
        />
      </form>
    </FormProvider>
  );
}
