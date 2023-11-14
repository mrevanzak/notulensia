import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Tier } from "@/lib/validations/tier";
import { getTierKey } from "./get-tier";
import { getTierDetailKey } from "./get-tier-detail";

export const useUpdateTier = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Tier) => {
      await httpClient.put(`/tier/${data.id}`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getTierKey] });
      void queryClient.invalidateQueries({ queryKey: [getTierDetailKey] });
      router.push("/master-data/tier");
    },
  });
};
