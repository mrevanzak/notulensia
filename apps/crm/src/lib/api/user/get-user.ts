import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { userSchema } from "@/lib/validations/user";
import { useQuery } from "@tanstack/react-query";

export const getUserKey = "getUser";

export const useGetUser = () => {
  return useQuery({
    queryKey: [getUserKey],
    queryFn: async () => {
      const response = await httpClient.get("/user");

      return createPaginatedResponseSchema(userSchema).parse(response.data);
    },
    staleTime: Infinity,
  });
};
