import { httpClient } from "@/lib/http";
import { eventCategoryDropdownSchema } from "@/lib/validations/event-category";
import type { QueryParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getEventCategoryDropdownKey = "getEventCategoryDropdown";

export const useGetEventCategoryDropdown = (params?: QueryParams) => {
  return useQuery({
    queryKey: [getEventCategoryDropdownKey],
    queryFn: async () => {
      const response = await httpClient.get("/event/category/dropdown", {
        params,
      });

      return eventCategoryDropdownSchema.array().parse(response.data);
    },
    staleTime: 1000 * 60 * 60 * 2,
  });
};
