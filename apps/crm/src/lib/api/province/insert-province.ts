import { httpClient } from "@/lib/http";
import type { Province } from "@/lib/validations/province";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getProvinceKey } from "./get-province";

export const useInsertProvince = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Omit<Province, "id">) => {
      await httpClient.post("/province", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getProvinceKey] });
      router.push("/master-data/province");
    },
  });
};
