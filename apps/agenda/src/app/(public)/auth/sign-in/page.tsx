import type { ReactElement } from "react";
import React from "react";
import SignInForm from "@/components/forms/signin-form";
import Link from "next/link";
import Logo from "~/svg/logo.svg";

export default function SignInPage(): ReactElement {
  return (
    <>
    <div className="tw-bg-white tw-h-[295px] tw-w-full tw-top-0 tw-shadow-lg" style={{zIndex: 1}}>
      <Link href="/">
        <Logo className="tw-w-96 tw-mx-auto tw-mt-5" />
      </Link>
    </div>
    
    <div className="tw-rounded-3xl tw-filter tw-absolute tw-top-[50%] tw-translate-y-[-50%] tw-w-[40rem] tw-min-w-fit tw-shadow-2xl" 
      style={
        {
          boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.3)',
          zIndex: 2
        }
    }>
      <SignInForm />
    </div>
    </>
  );
}
