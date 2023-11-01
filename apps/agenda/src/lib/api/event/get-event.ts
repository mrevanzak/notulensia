import { httpClient } from "@/lib/http";
import { eventSchema } from "@/lib/validations/event";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { QueryParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getEventKey = "getEvent";

export const useGetEvent = (query?: QueryParams) => {
    return useQuery({
        queryKey: [getEventKey],
        queryFn: async () => {
            const response = await httpClient.get("/event", {
                params: query,
            });

            return createPaginatedResponseSchema(eventSchema).parse(
                response.data
            );
        },
        staleTime: 1000 * 60 * 60 * 2,
    });
};
