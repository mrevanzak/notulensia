"use client";
import type { SignInFormValues } from "@/lib/validations/auth";
import { authSchema } from "@/lib/validations/auth";
import Link from "next/link";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { useSignIn } from "@/lib/api/auth/sign-in";
import { errorMessages } from "@/lib/error";
import { useSignInGoogle } from "@/lib/api/auth/sign-in-google";



export default function SignInForm(): ReactElement {
  const { mutate, isPending, isError, error } = useSignIn();
  const {mutate:google, isError:isErrorGoogle, error:googleError} = useSignInGoogle();
  const [isLoading, setIsLoading] = useState(false);  
  
  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(authSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    mutate({ ...data });
  });

    const hash = typeof window !== 'undefined' ? window.location.hash : null;
    const hashParams = hash !== null ? new URLSearchParams(hash.slice(1)) : null;
    const ssoToken = hashParams !== null ? hashParams.get('access_token') : null;

  useEffect(() => {
    if(isErrorGoogle || googleError) setIsLoading(false);
    if(ssoToken) {google({token:ssoToken}); setIsLoading(true)};
  }, [ssoToken])

  const handleGoogleAuth = () => {
    const auth = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount';
    const queryParams = {
      client_id: '898862951743-ort2u42i3kgdfuhsf9jn1ffi9a39embv.apps.googleusercontent.com',
      redirect_uri: 'https://agenda.saranaintegrasi.co.id/auth/sign-in',
      scope : 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      prompt : 'select_account',
      response_type : 'token',
      include_granted_scopes: true,
      enable_granular_consent:true,
    };
    const queryString = Object.keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    const url = `${auth}?${queryString}`;
    window.location.href = url;
    setIsLoading(true);
  };

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
      <Button
        className="w-full !tw-p-4 !tw-mt-8"
        icon="pi pi-google"
        label="Login with Google"
        loading={isLoading}
        onClick={handleGoogleAuth}
      />
    </div>
  );
}
