"use client";
import type { ReactElement } from "react";
import React, { useState, useEffect, useContext } from "react";
import { Toast } from "primereact/toast";
import type { Demo } from "@/types/types";
import { MailContext } from "@/demo/components/apps/mail/context/mail-context";
import AppMailTable from "@/demo/components/apps/mail/app-mail-table";

export default function MailArchivedPage(): ReactElement {
  const [archivedMails, setArchivedMails] = useState<Demo.Mail[]>([]);
  const { mails } = useContext(MailContext);
  useEffect(() => {
    const _mails = mails.filter((d) => d.archived);
    setArchivedMails(_mails);
  }, [mails]);

  return (
    <>
      <Toast />
      <AppMailTable mails={archivedMails} />
    </>
  );
}