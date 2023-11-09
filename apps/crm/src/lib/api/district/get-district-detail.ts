import { httpClient } from "@/lib/http";
import { districtFormSchema } from "@/lib/validations/district";
import { useQuery } from "@tanstack/react-query";

export const getDistrictDetailKey = "getDistrictDetail";

export const useGetDistrictDetail = (districtId?: string) => {
  return useQuery({
    queryKey: [getDistrictDetailKey, districtId],
    queryFn: async () => {
      const response = await httpClient.get(`/district/${districtId}`);

      return districtFormSchema.parse(response.data);
    },
    enabled: Boolean(districtId),
    staleTime: Infinity,
  });
};
