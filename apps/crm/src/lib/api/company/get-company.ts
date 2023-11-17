import { httpClient } from "@/lib/http";
import { companySchema } from "@/lib/validations/company";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getCompanyKey = "getCompany";

export const useGetCompany = ({
  limit,
  pageIndex,
  search,
}: PaginatedParams) => {
  return useQuery({
    queryKey: [getCompanyKey, { limit, pageIndex, search }],
    queryFn: async () => {
      const response = await httpClient.get("/company", {
        params: {
          limit,
          pageIndex,
          search,
        },
      });

      return createPaginatedResponseSchema(companySchema).parse(response.data);
    },
    staleTime: Infinity,
  });
};
