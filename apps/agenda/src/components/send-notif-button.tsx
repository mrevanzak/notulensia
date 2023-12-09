import { useSendNotification } from "@/lib/api/event/send-notification";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";

export default function SendNotifButton() {
  const { id } = useParams();
  const { mutate } = useSendNotification(id as string);

  return (
    <Button
      label="Send Notif"
      onClick={() => {
        mutate();
      }}
    />
  );
}
