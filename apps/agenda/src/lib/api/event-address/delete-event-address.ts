import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getDetailEventAddressKey } from "./get-detail-event-address";
import { getEventAddressKey } from "./get-event-address";

export const useDeleteEventAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (eventAddressId:string) => {
            await httpClient.delete(`/event/address/${eventAddressId}`);
        },
        onSuccess : () => {
            void queryClient.invalidateQueries({ queryKey: [getEventAddressKey]})
        },
    });
}