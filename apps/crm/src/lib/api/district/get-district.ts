import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { districtSchema } from "@/lib/validations/district";
import { useQuery } from "@tanstack/react-query";

export const getDistrictKey = "getDistrict";

export const useGetDistrict = () => {
  return useQuery({
    queryKey: [getDistrictKey],
    queryFn: async () => {
      const response = await httpClient.get("/district");

      return createPaginatedResponseSchema(districtSchema).parse(response.data);
    },
    staleTime: Infinity,
  });
};
