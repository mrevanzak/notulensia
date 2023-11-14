import { httpClient } from "@/lib/http";
import type { TierFormValues } from "@/lib/validations/tier";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getTierKey } from "./get-tier";

export const useInsertTier = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: TierFormValues) => {
      await httpClient.post("/tier", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getTierKey] });
      router.push("/features");
    },
  });
};
