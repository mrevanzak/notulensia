import { httpClient } from "@/lib/http";
import { audienceGroupFormSchema } from "@/lib/validations/audience";
import { useQuery } from "@tanstack/react-query";
import { getAudienceKey } from "./get-audience";

export const getAudienceDetailKey = "getAudienceDetail";

export const useGetAudienceDetail = (audienceId?: string) => {
  return useQuery({
    queryKey: [getAudienceKey, audienceId],
    queryFn: async () => {
      const response = await httpClient.get(`/audience/${audienceId}`);

      return audienceGroupFormSchema.parseAsync(response.data);
    },
    enabled: Boolean(audienceId),
    staleTime: Infinity,
  });
};
