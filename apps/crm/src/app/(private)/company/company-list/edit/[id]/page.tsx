import CompanyForm from "@/components/forms/company-form";
import SearchInput from "@/components/ui/search-input";
import { InputText } from "primereact/inputtext";
import type { ReactElement } from "react";

export default function CompanyDetailPage(): ReactElement {
  return (
    <div className="grid">
      <div className="col-12 mb-2 tw-flex tw-flex-row tw-justify-between">
        <h2>CRM</h2>
        <SearchInput className="tw-w-1/2" />
      </div>
      <div className="col-12 card tw-shadow tw-space-y-8 p-4">
        <p className="tw-text-xl tw-font-semibold">Company Detail</p>
        <CompanyForm edit />
      </div>
    </div>
  );
}
