import { httpClient } from "@/lib/http";
import { provinceSchema } from "@/lib/validations/province";
import { useQuery } from "@tanstack/react-query";

export const getProvinceDetailKey = "getProvinceDetail";

export const useGetProvinceDetail = (provinceId?: string) => {
  return useQuery({
    queryKey: [getProvinceDetailKey, provinceId],
    queryFn: async () => {
      const response = await httpClient.get(`/province/${provinceId}`);

      return provinceSchema.parse(response.data);
    },
    enabled: Boolean(provinceId),
    staleTime: Infinity,
  });
};
