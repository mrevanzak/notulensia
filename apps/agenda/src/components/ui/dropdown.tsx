import { Dropdown as PrimeDropdown } from "primereact/dropdown";
import type { SelectItemOptionsType } from "primereact/selectitem";

import { classNames } from "primereact/utils";
import type { ReactElement } from "react";
import React from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, get, useFormContext } from "react-hook-form";

export type DropdownProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Float label */
  float?: boolean;
  /** Options for the dropdown */
  options?: SelectItemOptionsType;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
};

export default function Dropdown({
  label,
  id,
  validation,
  float = false,
  options,
}: DropdownProps): ReactElement {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);

  return (
    <>
      {!float && (
        <p
          className={classNames("block mb-2 tw-text-white", {
            "p-error": error,
          })}
        >
          {label}
        </p>
      )}
      <Controller
        control={control}
        name={id}
        render={({ field, fieldState }) => (
          <span className={classNames({ "p-float-label": float })}>
            <PrimeDropdown
              className={classNames(
                { "p-invalid": fieldState.error },
                "w-full",
              )}
              editable
              id={field.name}
              onChange={field.onChange}
              options={options}
              value={field.value}
            />
            {float ? (
              <label
                className={classNames("tw-text-white", {
                  "p-error": error,
                })}
                htmlFor={field.name}
              >
                {label}
              </label>
            ) : null}
          </span>
        )}
        rules={validation}
      />
      {error ? (
        <small className="p-error">{error.message?.toString()}</small>
      ) : null}
    </>
  );
}
