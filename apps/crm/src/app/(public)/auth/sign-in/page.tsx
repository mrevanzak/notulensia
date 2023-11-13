import type { ReactElement } from "react";
import React from "react";
import SignInForm from "@/components/forms/signin-form";

export default function SignInPage(): ReactElement {
  return (
    <div className="tw-flex tw-h-screen tw-justify-center tw-items-center">
      <SignInForm />
    </div>
  );
}
