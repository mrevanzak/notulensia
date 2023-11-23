import { httpClient } from "@/lib/http";
import { eventSchema } from "@/lib/validations/event";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getEventCompanyByUserIdKey = "getEventCompanyByUserId";

export const useGetEventCompanyByUserId = (
  userId: string,
  { limit, pageIndex, search }: PaginatedParams,
) => {
  return useQuery({
    queryKey: [
      getEventCompanyByUserIdKey,
      userId,
      { limit, pageIndex, search },
    ],
    queryFn: async () => {
      const response = await httpClient.get(`/event/${userId}`, {
        params: {
          limit,
          pageIndex,
          search,
        },
      });

      return createPaginatedResponseSchema(eventSchema).parse(response.data);
    },
  });
};
