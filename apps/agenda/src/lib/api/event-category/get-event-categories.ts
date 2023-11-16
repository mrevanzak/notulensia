import { httpClient } from "@/lib/http";
import { eventCategorySchema } from "@/lib/validations/event-category";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { QueryParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getEventCategoryKey = "getEventCategoryKey";

export const useGetEventCategory = (query? : QueryParams) => {
    return useQuery({
        queryKey : [getEventCategoryKey],
        queryFn : async () => {
            const res = await httpClient.get("/event/category", {
                params : query
            });
            return createPaginatedResponseSchema(eventCategorySchema).parse(res.data);
        }
    });
}