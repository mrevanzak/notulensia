import { httpClient } from "@/lib/http";
import { EventAddressForm } from "@/lib/validations/event-address";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { getEventAddressKey } from "./get-event-address";


export const useInsertEventAddress = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (body: EventAddressForm) => {
            await httpClient.post("/event/address", body);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey : [getEventAddressKey]});
            router.push("/data-master/address");
        }
    })
}