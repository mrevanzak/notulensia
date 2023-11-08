import { httpClient } from "@/lib/http";
import type { District } from "@/lib/validations/district";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getDistrictKey } from "./get-district";

export const useInsertDistrict = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Omit<District, "id">) => {
      await httpClient.post("/district", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getDistrictKey] });
      router.push("/master-data/district");
    },
  });
};
