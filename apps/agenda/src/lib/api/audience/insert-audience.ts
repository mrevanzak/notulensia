import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAudienceKey } from "./get-audience";
import type { AudienceFormValues } from "@/lib/validations/audience";
import { useRouter } from "next/navigation";

export const useInsertAudience = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: AudienceFormValues) => {
      await httpClient.post("/audience", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getAudienceKey] });
      router.push("/audience-group");
    },
  });
};
