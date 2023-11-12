"use client";
import type { InputTextProps } from "primereact/inputtext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import type { ReactElement } from "react";
import React, { useState } from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, get, useFormContext } from "react-hook-form";

export type InputProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Icon */
  icon?: string;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
} & InputTextProps;

export default function Input({
  label,
  id,
  icon,
  type = "text",
  validation,
  className,
  ...props
}: InputProps): ReactElement {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);

  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      <p
        className={classNames("block mb-2", {
          "p-error": error,
        })}
      >
        {label}
      </p>
      <Controller
        control={control}
        name={id}
        render={({ field, fieldState }) => (
          <span className="p-input-icon-right block">
            <i
              className={classNames(
                "pi",
                icon,
                isPassword && "tw-cursor-pointer",
                showPassword && isPassword && "pi-eye",
                !showPassword && isPassword && "pi-eye-slash",
              )}
              onClick={() => {
                if (isPassword) {
                  setShowPassword(!showPassword);
                }
              }}
            />
            <InputText
              className={classNames(
                { "p-invalid": fieldState.error },
                "w-full",
              )}
              id={field.name}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              type={isPassword && !showPassword ? "password" : "text"}
              value={field.value}
              {...props}
            />
          </span>
        )}
        rules={validation}
      />
      {error ? (
        <small className="p-error">{error.message?.toString()}</small>
      ) : null}
    </div>
  );
}
