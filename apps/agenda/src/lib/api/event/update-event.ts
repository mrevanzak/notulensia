import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getEventKey } from "./get-event";
import type { InsertEventParams } from "./insert-event";
import { getEventDetailKey } from "./get-event-detail";

type UpdateEventParams = InsertEventParams & { id: string };

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: UpdateEventParams) => {
      await httpClient.put(`/event/${data.id}`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getEventKey] });
      void queryClient.invalidateQueries({ queryKey: [getEventDetailKey] });
      router.push("/events");
    },
  });
};
