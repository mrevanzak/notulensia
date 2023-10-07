"use client";
import type {ReactElement} from "react";
import React from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useRouter} from "next/navigation";
import Image from "next/image";

export default function Login(): ReactElement {
  const router = useRouter();
  const navigateToDashboard = (): void => {
    router.push("/");
  };

  return (
    <div className="overflow-hidden margin-0 relative h-screen">
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: "url(/layout/images/pages/login/bg-login.jpg)",
          height: "calc(100% - 370px)",
        }}
      />
      <div className="w-full absolute mb-0 bottom-0 text-center surface-900 border-noround p-fluid h-27rem">
        <div
          className="px-6 md:p-0 w-29rem relative text-white"
          style={{marginLeft: " -200px", top: "30px", left: "50%"}}
        >
          <div className="grid">
            <div className="col-3 text-left relative">
              <Image
                alt="avalon-react"
                fill
                src="/layout/images/pages/login/icon-login.svg"
              />
            </div>
            <div className="col-9 text-left">
              <h2 className="mb-0 text-0">Welcome Guest</h2>
              <span className="text-500 text-sm">
                Sign in to Avalon Network
              </span>
            </div>
            <div className="col-12 text-left">
              <label className="text-400" htmlFor="username">
                Username
                <InputText
                  className="mt-1"
                  id="username"
                  placeholder="Username"
                  type="text"
                />
              </label>
            </div>
            <div className="col-12 text-left">
              <label className="text-400" htmlFor="password">
                Password
                <InputText
                  className="mt-1"
                  id="password"
                  placeholder="Password"
                  type="password"
                />
              </label>
            </div>
            <div className="col-12 md:col-6">
              <Button label="Sign In" onClick={navigateToDashboard} />
            </div>
            <div className="col-12 md:col-6">
              <Button
                className="text-gray-300 flex justify-content-center"
                text
              >
                Forgot Password?
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
