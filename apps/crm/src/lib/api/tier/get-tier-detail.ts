import { httpClient } from "@/lib/http";
import { tierSchema } from "@/lib/validations/tier";
import { useQuery } from "@tanstack/react-query";

export const getTierDetailKey = "getTierDetail";

export const useGetTierDetail = (tierId?: string) => {
  return useQuery({
    queryKey: [getTierDetailKey, tierId],
    queryFn: async () => {
      const response = await httpClient.get(`/tier/${tierId}`);

      return tierSchema.parse(response.data);
    },
    enabled: Boolean(tierId),
    staleTime: Infinity,
  });
};
