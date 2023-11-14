import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { userActivitySchema } from "@/lib/validations/user";
import { useQuery } from "@tanstack/react-query";

export const getUserActivityKey = "getUserActivity";

export const useGetUserActivity = (userId: string) => {
  return useQuery({
    queryKey: [getUserActivityKey, userId],
    queryFn: async () => {
      const response = await httpClient.get(`/user/activity/${userId}`);

      return createPaginatedResponseSchema(userActivitySchema).parse(
        response.data,
      );
    },
    staleTime: Infinity,
  });
};
