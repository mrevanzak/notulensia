import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompanyKey } from "./get-company";

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyId: string) => {
      await httpClient.delete(`/company/${companyId}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getCompanyKey] });
    },
  });
};
