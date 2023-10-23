import type { ReactElement } from "react";
import React from "react";
import SignInForm from "@/components/forms/signin-form";

export default function SignInPage(): ReactElement {
  return (
    <div
      className="tw-rounded-3xl tw-p-1 tw-w-1/3 tw-max-w-md tw-min-w-fit tw-mx-auto"
      style={{
        background:
          "linear-gradient(135.59deg,rgba(88, 130, 193, 0.49) 1.28%,rgba(88, 130, 193, 0.11) 96.26%)",
      }}
    >
      <div
        className="tw-p-24 tw-rounded-[20px]"
        style={{
          background:
            "linear-gradient(135.59deg, rgba(88, 130, 193, 0.49) 1.28%, rgba(88, 130, 193, 0.11) 96.26%),linear-gradient(0deg, rgba(88, 130, 193, 0.28), rgba(88, 130, 193, 0.28))",
        }}
      >
        <h2 className="tw-text-white tw-text-center">Sign In</h2>
        <SignInForm />
      </div>
    </div>
  );
}
