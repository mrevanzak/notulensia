import { httpClient } from "@/lib/http";
import { tierDropdownSchema } from "@/lib/validations/tier";
import { useQuery } from "@tanstack/react-query";

export const getTierDropdownKey = "getTierDropdown";

export const useGetTierDropdown = () => {
  return useQuery({
    queryKey: [getTierDropdownKey],
    queryFn: async () => {
      const response = await httpClient.get("/tier/dropdown");

      return tierDropdownSchema.array().parse(response.data);
    },
    staleTime: Infinity,
  });
};
