import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { District, DistrictFormValues } from "@/lib/validations/district";
import { getDistrictKey } from "./get-district";
import { getDistrictDetailKey } from "./get-district-detail";

type UpdateDistrictParams = DistrictFormValues & Pick<District, "id">;

export const useUpdateDistrict = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: UpdateDistrictParams) => {
      await httpClient.put(`/district/${data.id}`, {
        ...data,
        provinceId: data.province.id,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getDistrictKey] });
      void queryClient.invalidateQueries({
        queryKey: [getDistrictDetailKey],
      });
      router.push("/master-data/district");
    },
  });
};
