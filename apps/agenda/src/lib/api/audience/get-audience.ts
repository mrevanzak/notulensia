import { httpClient } from "@/lib/http";
import { audienceGroupSchema } from "@/lib/validations/audience";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { QueryParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getAudienceKey = "getAudience";

export const useGetAudience = (params?: QueryParams) => {
  return useQuery({
    queryKey: [getAudienceKey],
    queryFn: async () => {
      const response = await httpClient.get("/audience", {
        params,
      });

      return createPaginatedResponseSchema(audienceGroupSchema).parse(
        response.data,
      );
    },
    staleTime: 1000 * 60 * 60 * 2,
  });
};
