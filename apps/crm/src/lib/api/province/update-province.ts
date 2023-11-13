import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Province } from "@/lib/validations/province";
import { getProvinceKey } from "./get-province";
import { getProvinceDetailKey } from "./get-province-detail";

export const useUpdateProvince = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Province) => {
      await httpClient.put(`/province/${data.id}`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getProvinceKey] });
      void queryClient.invalidateQueries({ queryKey: [getProvinceDetailKey] });
      router.push("/master-data/province");
    },
  });
};
