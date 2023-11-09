import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { provinceSchema } from "@/lib/validations/province";
import { useQuery } from "@tanstack/react-query";

export const getProvinceKey = "getProvince";

export const useGetProvince = () => {
  return useQuery({
    queryKey: [getProvinceKey],
    queryFn: async () => {
      const response = await httpClient.get("/province");

      return createPaginatedResponseSchema(provinceSchema).parse(response.data);
    },
    staleTime: Infinity,
  });
};
