import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { provinceSchema } from "@/lib/validations/province";
import type { PaginatedParams } from "@/types/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const getProvinceKey = "getProvince";

export const useGetProvince = ({
  limit,
  pageIndex,
  search,
}: PaginatedParams) => {
  return useQuery({
    queryKey: [getProvinceKey, { limit, pageIndex, search }],
    queryFn: async () => {
      const response = await httpClient.get("/province", {
        params: {
          limit,
          pageIndex,
          search,
        },
      });

      return createPaginatedResponseSchema(provinceSchema).parse(response.data);
    },
    placeholderData: keepPreviousData,
  });
};
