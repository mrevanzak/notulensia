import { httpClient } from "@/lib/http";
import { districtSchema } from "@/lib/validations/district";
import { useQuery } from "@tanstack/react-query";

export const getDistrictByProvinceKey = "getDistrict";

export const useGetDistrict = (province?: string | null) => {
  return useQuery({
    queryKey: [getDistrictByProvinceKey, province],
    queryFn: async () => {
      const response = await httpClient.get("/district", {
        params: {
          province,
        },
      });

      return districtSchema.array().parse(response.data);
    },
    enabled: Boolean(province),
  });
};
