import { httpClient } from "@/lib/http";
import { updateCompanyFormSchema } from "@/lib/validations/company";
import { useQuery } from "@tanstack/react-query";

export const getCompanyDetailKey = "getCompanyDetail";

export const useGetCompanyDetail = (companyId?: string) => {
  return useQuery({
    queryKey: [getCompanyDetailKey, companyId],
    queryFn: async () => {
      const response = await httpClient.get(`/company/${companyId}`);

      return updateCompanyFormSchema.parse(response.data);
    },
    enabled: Boolean(companyId),
  });
};
