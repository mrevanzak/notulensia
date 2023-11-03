import { httpClient } from "@/lib/http";
import { profileSchema } from "@/lib/validations/user";
import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";

export const getUserDetailKey = "getUserDetail";

export const useGetUserDetail = (): UseQueryResult<
  z.infer<typeof profileSchema>
> => {
  return useQuery({
    queryKey: [getUserDetailKey],
    queryFn: async () => {
      const response = await httpClient.get("/user/me");
      return profileSchema.parse(response.data);
    },
    staleTime: 1000 * 60 * 60 * 2,
  });
};
