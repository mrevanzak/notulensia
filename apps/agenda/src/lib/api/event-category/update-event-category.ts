import { httpClient } from "@/lib/http";
import type { EventCategorySchema} from "@/lib/validations/event-category";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { getEventCategoryKey } from "./get-event-categories";
import { getDetailEventCategoryKey } from "./get-detail-event-category";

export const useUpdateEventCategory = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn :async (body: EventCategorySchema) => {
            await httpClient.put(`/event/category/${body.id}`, body);
        },
        onSuccess : () => {
            void queryClient.invalidateQueries({queryKey : [getEventCategoryKey]});
            void queryClient.invalidateQueries({queryKey : [getDetailEventCategoryKey]});
            router.push("/data-master/event-category");
        }
    })
}