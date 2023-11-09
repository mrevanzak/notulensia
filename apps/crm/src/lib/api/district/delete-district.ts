import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDistrictKey } from "./get-district";

export const useDeleteDistrict = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (districtId: string) => {
      await httpClient.delete(`/district/${districtId}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getDistrictKey] });
    },
  });
};
