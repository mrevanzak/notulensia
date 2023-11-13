import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventCategoryKey } from "./get-event-categories";

export const useDeleteEventCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventCategoryId: string) => {
      await httpClient.delete(`/event/category/${eventCategoryId}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getEventCategoryKey] });
    },
  });
};
