import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { tierSchema } from "@/lib/validations/tier";
import { useQuery } from "@tanstack/react-query";

export const getTierKey = "getTier";

export const useGetTier = () => {
  return useQuery({
    queryKey: [getTierKey],
    queryFn: async () => {
      const response = await httpClient.get("/tier");

      return createPaginatedResponseSchema(tierSchema).parse(response.data);
    },
    staleTime: Infinity,
  });
};
