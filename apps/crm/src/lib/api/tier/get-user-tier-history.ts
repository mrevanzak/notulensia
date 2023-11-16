import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { tierHistorySchema } from "@/lib/validations/tier";
import { useQuery } from "@tanstack/react-query";

export const getUserTierHistoryKey = "getUserTierHistory";

export const useGetUserTierHistory = (userId: string) => {
  return useQuery({
    queryKey: [getUserTierHistoryKey, userId],
    queryFn: async () => {
      const response = await httpClient.get(`/tier/history/user/${userId}`);

      return createPaginatedResponseSchema(tierHistorySchema).parse(response.data);
    },
    staleTime: Infinity,
  });
};
