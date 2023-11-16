import UserForm from "@/components/forms/user-form";
import { InputText } from "primereact/inputtext";
import type { ReactElement } from "react";

export default function CompanyListAddPage(): ReactElement {
  return (
    <div className="grid">
      <div className="col-12 mb-2 tw-flex tw-flex-row tw-justify-between">
        <h2>CRM</h2>
        <span className="p-input-icon-right tw-w-1/2">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search"
            pt={{
              root: { className: "tw-w-full" },
            }}
          />
        </span>
      </div>
      <div className="col-12 card tw-shadow tw-space-x-8 tw-space-y-8 p-4">
        <p className="tw-text-xl tw-font-semibold">Add Customer</p>
        <UserForm />
      </div>
    </div>
  );
}
