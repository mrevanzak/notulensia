import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { userSchema } from "@/lib/validations/user";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getUserKey = "getUser";

export const useGetUser = ({ limit, pageIndex, search }: PaginatedParams) => {
  return useQuery({
    queryKey: [getUserKey, { limit, pageIndex, search }],
    queryFn: async () => {
      const response = await httpClient.get("/user", {
        params: {
          limit,
          pageIndex,
          search,
        },
      });

      return createPaginatedResponseSchema(userSchema).parse(response.data);
    },
  });
};
