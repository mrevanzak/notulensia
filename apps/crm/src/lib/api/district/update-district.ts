import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { District } from "@/lib/validations/district";
import { getDistrictKey } from "./get-district";
import { getDistrictDetailKey } from "./get-district-detail";

export const useUpdateDistrict = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: District) => {
      await httpClient.put(`/district/${data.id}`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getDistrictKey] });
      void queryClient.invalidateQueries({
        queryKey: [getDistrictDetailKey],
      });
      router.push("/events");
    },
  });
};
