"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type SearchInputProps = {
  className?: string;
};

export default function SearchInput({ className }: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const search = searchParams?.get("search");
  const [value, setValue] = useState(search ?? "");
  const {t} = useTranslation();

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        router.replace(`${pathName}?search=${value}`);
      }}
    >
      <span className="p-input-icon-right w-full">
        <i className="pi pi-search" />
        <InputText
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={t("Search")}
          pt={{
            root: { className: "tw-w-full" },
          }}
          value={value}
        />
      </span>
    </form>
  );
}
