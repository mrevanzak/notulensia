import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { useQuery } from "@tanstack/react-query";
import {  eventCategorySchema } from "@/lib/validations/event-category";

export const getEventCategoryKey = "getEventCategory";

export const useGetEventCategories = () => {
  return useQuery({
    queryKey: [getEventCategoryKey],
    queryFn: async () => {
      const response = await httpClient.get("/event/category");

      return createPaginatedResponseSchema(eventCategorySchema).parse(response.data);
    },
    staleTime: Infinity,
  });
};
