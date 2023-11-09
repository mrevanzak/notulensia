import { httpClient } from "@/lib/http";
import type { DistrictFormValues } from "@/lib/validations/district";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getDistrictKey } from "./get-district";

export const useInsertDistrict = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: DistrictFormValues) => {
      await httpClient.post("/district", {
        ...data,
        provinceId: data.province.id,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getDistrictKey] });
      router.push("/master-data/district");
    },
  });
};
