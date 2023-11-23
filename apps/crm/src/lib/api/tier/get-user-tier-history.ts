import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { tierHistorySchema } from "@/lib/validations/tier";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getUserTierHistoryKey = "getUserTierHistory";

export const useGetUserTierHistory = (
  userId: string,
  { limit, pageIndex, search }: PaginatedParams,
) => {
  return useQuery({
    queryKey: [getUserTierHistoryKey, userId, { limit, pageIndex, search }],
    queryFn: async () => {
      const response = await httpClient.get(`/tier/history/user/${userId}`, {
        params: {
          limit,
          pageIndex,
          search,
        },
      });

      return createPaginatedResponseSchema(tierHistorySchema).parse(
        response.data,
      );
    },
  });
};
