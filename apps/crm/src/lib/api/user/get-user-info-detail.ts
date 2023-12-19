import { httpClient, httpClientStorage } from "@/lib/http";
import { profileSchema } from "@/lib/validations/user";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useDownloadUserImage = () => {
  const { data: userData } = useGetUserInfo();

  return useMutation({
    mutationFn: async () => {
      const imgUrl = userData?.imgUrl;
      if (!userData || !imgUrl) {return new Blob()};

      const response = await httpClientStorage.get(`storage/asset/${userData.imgUrl}`, {
        responseType: "blob",
      });

      return response.data as Blob;
    },
  });
};
