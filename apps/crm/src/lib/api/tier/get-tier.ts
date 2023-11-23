import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { tierSchema } from "@/lib/validations/tier";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getTierKey = "getTier";

export const useGetTier = ({ limit, pageIndex, search }: PaginatedParams) => {
  return useQuery({
    queryKey: [getTierKey, { limit, pageIndex, search }],
    queryFn: async () => {
      const response = await httpClient.get("/tier", {
        params: {
          limit,
          pageIndex,
          search,
        },
      });

      return createPaginatedResponseSchema(tierSchema).parse(response.data);
    },
  });
};
