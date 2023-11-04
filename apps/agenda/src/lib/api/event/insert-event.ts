import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { EventFormValues } from "@/lib/validations/event";
import { getEventKey } from "./get-event";
import type { ScheduleProgram } from "@/lib/validations/schedule-program";

export type InsertEventParams = EventFormValues & {
  schedules?: ScheduleProgram[];
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
};

export const useInsertEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: InsertEventParams) => {
      await httpClient.post("/event", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getEventKey] });
      router.push("/events");
    },
  });
};
