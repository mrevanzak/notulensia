import EventCategoryForm from "@/components/forms/event-category-form";
import SearchInput from "@/components/ui/search-input";
import { InputText } from "primereact/inputtext";
import type { ReactElement } from "react";

export default function AddEventCategory(): ReactElement {
  return (
    <div className="grid">
      <div className="col-12 mb-2 tw-flex tw-flex-row tw-justify-between">
        <h2>CRM</h2>
        <SearchInput className="tw-w-1/2" />
      </div>
      <div className="col-12 card tw-shadow tw-space-x-8 tw-space-y-8 p-4">
        <p className="tw-text-xl tw-font-semibold">Add Event Category</p>
        <EventCategoryForm />
      </div>
    </div>
  );
}
