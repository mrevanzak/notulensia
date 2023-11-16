import { httpClient } from "@/lib/http";
import { eventAddressSchema } from "@/lib/validations/event-address";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { QueryParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getEventAddressKey = "getEventAddress";

export const useGetEventAddress = (query? :QueryParams) => {
    return useQuery({
        queryKey: [getEventAddressKey],
        queryFn: async () => {
            const res = await httpClient.get("/event/address", {
                params: query
            });
            return createPaginatedResponseSchema(eventAddressSchema).parse(res.data);
        }
    })
}