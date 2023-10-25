"use client";

import type { ReactElement } from "react";
import React, { useState, useEffect, useContext } from "react";
import type { Demo } from "@/types/types";
import { MailContext } from "@/demo/components/apps/mail/context/mail-context";
import AppMailTable from "@/demo/components/apps/mail/app-mail-table";

export default function MailInbox(): ReactElement {
  const [inbox, setInbox] = useState<Demo.Mail[]>([]);
  const { mails } = useContext(MailContext);
  useEffect(() => {
    const _mails = mails.filter(
      (d) =>
        !d.archived &&
        !d.spam &&
        !d.trash &&
        !Object.prototype.hasOwnProperty.call(d, "sent")
    );
    setInbox(_mails);
  }, [mails]);

  return <AppMailTable mails={inbox} />;
}
