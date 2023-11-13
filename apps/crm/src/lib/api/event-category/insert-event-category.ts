import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { EventCategory } from "@/lib/validations/event-category";
import { getEventCategoryKey } from "./get-event-categories";

export const useInsertEventCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Omit<EventCategory, "id">) => {
      await httpClient.post("/event/category", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getEventCategoryKey] });
      router.push("/master-data/event-category");
    },
  });
};
