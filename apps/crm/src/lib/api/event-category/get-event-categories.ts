import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { useQuery } from "@tanstack/react-query";
import { eventCategorySchema } from "@/lib/validations/event-category";
import type { PaginatedParams } from "@/types/api";

export const getEventCategoryKey = "getEventCategory";

export const useGetEventCategories = ({
  limit,
  pageIndex,
  search,
}: PaginatedParams) => {
  return useQuery({
    queryKey: [getEventCategoryKey, { limit, pageIndex, search }],
    queryFn: async () => {
      const response = await httpClient.get("/event/category", {
        params: {
          limit,
          pageIndex,
          search,
        },
      });

      return createPaginatedResponseSchema(eventCategorySchema).parse(
        response.data,
      );
    },
  });
};
