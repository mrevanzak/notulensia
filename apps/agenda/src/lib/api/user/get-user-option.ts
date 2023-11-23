import { httpClient } from "@/lib/http";
import { optionSchema } from "@/lib/validations/user";
import { useQuery } from "@tanstack/react-query";

export const getUserOptionKey = "getUserOption";

export const useGetUserOption = () => {
  return useQuery({
    queryKey: [getUserOptionKey],
    queryFn: async () => {
      const response = await httpClient.get("/user/option");
      return optionSchema.array().parse(response.data);
    },
  });
};
