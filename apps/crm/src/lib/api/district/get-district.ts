import { httpClient } from "@/lib/http";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import { districtSchema } from "@/lib/validations/district";
import { useQuery } from "@tanstack/react-query";
import type { PaginatedParams } from "@/types/api";

export const getDistrictKey = "getDistrict";

export const useGetDistrict = ({
  limit,
  pageIndex,
  search,
}: PaginatedParams) => {
  return useQuery({
    queryKey: [getDistrictKey, { limit, pageIndex, search }],
    queryFn: async () => {
      const response = await httpClient.get("/district", {
        params: {
          limit,
          pageIndex,
          search,
        },
      });

      return createPaginatedResponseSchema(districtSchema).parse(response.data);
    },
  });
};
