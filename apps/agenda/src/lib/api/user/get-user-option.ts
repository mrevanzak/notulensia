import { httpClient } from "@/lib/http";
import { optionSchema } from "@/lib/validations/user";
import { useQuery } from "@tanstack/react-query";

export const getUserOptionKey = "getUserOption";

export const useGetUserOption = () => {
  return useQuery({
    queryKey: [getUserOptionKey],
    queryFn: async () => {
      const response = await httpClient.get("/user/option");

      const parse = optionSchema.parse(response.data);
      return {
        notification:
          parse.userOptions.find((option) => option.name === "notification")
            ?.value ?? "",
        dashboard:
          parse.userOptions.find((option) => option.name === "dashboard")
            ?.value ?? "",
      };
    },
  });
};
