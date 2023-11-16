import { httpClient } from "@/lib/http";
import { eventSchema } from "@/lib/validations/event";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { useQuery } from "@tanstack/react-query";

export const getEventCompanyByUserIdKey = "getEventCompanyByUserId";

export const useGetEventCompanyByUserId = (userId: string) => {
  return useQuery({
    queryKey: [getEventCompanyByUserIdKey, userId],
    queryFn: async () => {
      const response = await httpClient.get(`/event/${userId}`);

      return createPaginatedResponseSchema(eventSchema).parse(response.data);
    },
    staleTime: Infinity,
  });
};
