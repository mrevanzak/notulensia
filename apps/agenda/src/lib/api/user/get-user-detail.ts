import { httpClient } from "@/lib/http";
import { profileSchema } from "@/lib/validations/user";
import { useQuery } from "@tanstack/react-query";

export const getUserDetailKey = "getUserDetail";

export const useGetUserDetail = () => {
  return useQuery({
    queryKey: [getUserDetailKey],
    queryFn: async () => {
      const response = await httpClient.get("/user/me");
      return profileSchema.parse(response.data);
    },
    staleTime: 1000 * 60 * 60 * 2,
  });
};
