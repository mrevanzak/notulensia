import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getProvinceKey } from "./get-province";

export const useDeleteProvince = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (provinceId: string) => {
      await httpClient.delete(`/province/${provinceId}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getProvinceKey] });
    },
  });
};
