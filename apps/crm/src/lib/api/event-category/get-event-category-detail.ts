import { httpClient } from "@/lib/http";
import { eventCategorySchema } from "@/lib/validations/event-category";
import { useQuery } from "@tanstack/react-query";

export const getEventCategoryDetailKey = "getEventCategory";

export const useGetEventCategoryDetail = (eventCategoryId?: string) => {
  return useQuery({
    queryKey: [getEventCategoryDetailKey, eventCategoryId],
    queryFn: async () => {
      const response = await httpClient.get(`/event/category/${eventCategoryId}`);

      return eventCategorySchema.parse(response.data);
    },
    enabled: Boolean(eventCategoryId),
    staleTime: Infinity,
  });
};
