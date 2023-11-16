import { httpClient } from "@/lib/http";
import { companySchema } from "@/lib/validations/company";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { useQuery } from "@tanstack/react-query";

export const getCompanyKey = "getCompany";

export const useGetCompany = () => {
  return useQuery({
    queryKey: [getCompanyKey],
    queryFn: async () => {
      const response = await httpClient.get("/company");

      return createPaginatedResponseSchema(companySchema).parse(response.data);
    },
    staleTime: Infinity,
  });
};
