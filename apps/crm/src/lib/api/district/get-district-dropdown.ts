import { httpClient } from "@/lib/http";
import { districtSchema } from "@/lib/validations/district";
import { useQuery } from "@tanstack/react-query";

export const getDistrictByProvinceKey = "getDistrict";

export const useGetDistrictDropdown = (provinceId?: string | null) => {
  return useQuery({
    queryKey: [getDistrictByProvinceKey, provinceId],
    queryFn: async () => {
      const response = await httpClient.get(
        `/district/dropdown/province/${provinceId}`,
      );

      return districtSchema.array().parse(response.data);
    },
    enabled: Boolean(provinceId),
    staleTime: Infinity,
  });
};
