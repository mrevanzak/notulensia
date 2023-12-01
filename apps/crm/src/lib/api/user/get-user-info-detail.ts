import { httpClient } from "@/lib/http";
import { profileSchema } from "@/lib/validations/user";
import { useQuery } from "@tanstack/react-query";

export const getUserInfoKey = "getUserInfo";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [getUserInfoKey],
    queryFn: async () => {
      const response = await httpClient.get("/user/me");
      return profileSchema.parse(response.data);
    },
  });
};
