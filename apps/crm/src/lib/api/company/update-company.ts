import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Company, CompanyFormValues } from "@/lib/validations/company";
import { getCompanyKey } from "./get-company";
import { getCompanyDetailKey } from "./get-company-detail";

type UpdateCompanyParams = CompanyFormValues & Pick<Company, "id">;

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: UpdateCompanyParams) => {
      await httpClient.put(`/company/${data.id}`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getCompanyKey] });
      void queryClient.invalidateQueries({
        queryKey: [getCompanyDetailKey],
      });
      router.push("/company/company-list");
    },
  });
};
