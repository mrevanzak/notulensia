import { httpClient } from "@/lib/http";
import type { Province } from "@/lib/validations/province";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getProvinceKey } from "./get-province";
import { getProvinceDropdownKey } from "./get-province-dropdown";

export const useInsertProvince = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Omit<Province, "id">) => {
      await httpClient.post("/province", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getProvinceKey] });
      void queryClient.invalidateQueries({
        queryKey: [getProvinceDropdownKey],
      });
      router.push("/master-data/province");
    },
  });
};
