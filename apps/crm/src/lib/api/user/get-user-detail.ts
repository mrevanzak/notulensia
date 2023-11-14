import { httpClient } from "@/lib/http";
import { userSchema } from "@/lib/validations/user";
import { useQuery } from "@tanstack/react-query";

export const getUserDetailKey = "getUserDetail";

export const useGetUserDetail = (userId: string) => {
  return useQuery({
    queryKey: [getUserDetailKey, userId],
    queryFn: async () => {
      const response = await httpClient.get(`/user/${userId}`);
      return userSchema.parse(response.data);
    },
    staleTime: 1000 * 60 * 60 * 2,
  });
};
