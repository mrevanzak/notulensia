import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { EventFormValues } from "@/lib/validations/event";
import { getEventListKey } from "./get-event-list";

export const useInsertEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: EventFormValues) => {
      const response = await httpClient.post("/event", data);
      return response.data;
    },
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: [getEventListKey] });
      router.push("/event");
    },
  });
};
