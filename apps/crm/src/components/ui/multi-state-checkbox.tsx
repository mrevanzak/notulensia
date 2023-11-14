/* eslint-disable @typescript-eslint/consistent-type-imports */
import React from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, get, useFormContext } from "react-hook-form";
import {
  MultiStateCheckbox as PrimeMultiStateCheckbox,
  MultiStateCheckboxProps as PrimeMultiStateCheckboxProps,
} from "primereact/multistatecheckbox";
import { classNames } from "primereact/utils";

type MultiStateCheckboxProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   * */
  id: string;
  validation?: RegisterOptions;
} & PrimeMultiStateCheckboxProps;

export default function MultiStateCheckbox({
  label,
  id,
  validation,
  className,
  ...props
}: MultiStateCheckboxProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);

  return (
    <div>
      <p
        className={classNames("block tw-mb-2", {
          "p-error": error,
        })}
      >
        {label}
      </p>
      <Controller
        control={control}
        name={id}
        render={({ field }) => {
          return (
            <div className={className}>
              <div className="tw-flex tw-items-center tw-space-x-2">
                <PrimeMultiStateCheckbox
                  className={classNames({ "p-invalid": error })}
                  id={field.name}
                  onChange={field.onChange}
                  optionValue="value"
                  value={field.value}
                  {...props}
                />
                <span>{field.value}</span>
              </div>
              {error ? (
                <small className="p-error">{error.message?.toString()}</small>
              ) : null}
            </div>
          );
        }}
        rules={validation}
      />
    </div>
  );
}
