import { httpClient } from "@/lib/http";
import { userDropdownSchema } from "@/lib/validations/user";
import { useQuery } from "@tanstack/react-query";

export const getUserDropdownKey = "getUserDropdown";

export const useGetUserDropdown = () => {
  return useQuery({
    queryKey: [getUserDropdownKey],
    queryFn: async () => {
      const response = await httpClient.get("company/dropdown/user");

      return userDropdownSchema.array().parse(response.data);
    },
  });
};
