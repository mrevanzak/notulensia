import { httpClient } from "@/lib/http";
import type { EventCategorySchemaForm } from "@/lib/validations/event-category";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { getEventCategoryKey } from "./get-event-categories";
import { getDetailEventCategoryKey } from "./get-detail-event-category";

export const useInsertEventCategory = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn :async (body: EventCategorySchemaForm) => {
            await httpClient.post("/event/category", body);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey : [getEventCategoryKey]});
            void queryClient.invalidateQueries({queryKey : [getDetailEventCategoryKey]});
            router.push("/data-master/event-category");
        }
    })

}