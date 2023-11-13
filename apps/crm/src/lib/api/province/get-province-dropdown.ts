import { httpClient } from "@/lib/http";
import { provinceSchema } from "@/lib/validations/province";
import { useQuery } from "@tanstack/react-query";

export const getProvinceDropdownKey = "getProvinceDropdown";

export const useGetProvinceDropdown = () => {
  return useQuery({
    queryKey: [getProvinceDropdownKey],
    queryFn: async () => {
      const response = await httpClient.get("/province/dropdown");

      return provinceSchema.array().parse(response.data);
    },
    staleTime: Infinity,
  });
};
