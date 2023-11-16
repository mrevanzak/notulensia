import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTierKey } from "./get-tier";

export const useDeleteTier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tierId: string) => {
      await httpClient.delete(`/tier/${tierId}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getTierKey] });
    },
  });
};
