import { httpClient } from "@/lib/http";
import type { CompanyFormValues } from "@/lib/validations/company";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCompanyKey } from "./get-company";

export const useInsertCompany = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CompanyFormValues) => {
      await httpClient.post("/company", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getCompanyKey] });
      router.push("/company/company-list");
    },
  });
};
