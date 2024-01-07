import { useSendNotification } from "@/lib/api/event/send-notification";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

export default function SendNotifButton({linkValue}: {linkValue:string}) {
  const { id } = useParams();
  const { mutate, isPending } = useSendNotification(id as string, linkValue);
  const {t} = useTranslation();

  return (
    <Button
      icon="pi pi-share-alt"
      label={t("Send Notif")}
      loading={isPending}
      onClick={() => {
        mutate();
      }}
      type="button"
    />
  );
}
