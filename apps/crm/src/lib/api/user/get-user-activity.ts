import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { userActivitySchema } from "@/lib/validations/user";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getUserActivityKey = "getUserActivity";

export const useGetUserActivity = (
  userId: string,
  { limit, pageIndex, search }: PaginatedParams,
) => {
  return useQuery({
    queryKey: [getUserActivityKey, userId, { limit, pageIndex, search }],
    queryFn: async () => {
      const response = await httpClient.get(`/user/activity/${userId}`, {
        params: {
          limit,
          pageIndex,
          search,
        },
      });

      return createPaginatedResponseSchema(userActivitySchema).parse(
        response.data,
      );
    },
  });
};
