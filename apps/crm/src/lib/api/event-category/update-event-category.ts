import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { EventCategory } from "@/lib/validations/event-category";
import { getEventCategoryKey } from "./get-event-categories";
import { getEventCategoryDetailKey } from "./get-event-category-detail";
import { co } from "@fullcalendar/core/internal-common";

export const useUpdateEventCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: EventCategory) => {
      await httpClient.put(`/event/category/${data.id}`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getEventCategoryKey] });
      void queryClient.invalidateQueries({ queryKey: [getEventCategoryDetailKey] });
      router.push("/master-data/event-category");
    }
  });
};
