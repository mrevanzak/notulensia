import { httpClient } from "@/lib/http";
import { eventCalendarSchema } from "@/lib/validations/event";
import { useQuery } from "@tanstack/react-query";

export const getEventListCalendarKey = "getEventListCalendar";

type EventListCalendarParams = {
  from: string;
  to: string;
};

export const useGetEventListCalendar = (query: EventListCalendarParams) => {
  return useQuery({
    queryKey: [getEventListCalendarKey, query.from, query.to],
    queryFn: async () => {
      const response = await httpClient.get(
        `/event/calendar/${query.from}/${query.to}`,
      );

      return eventCalendarSchema.array().parse(response.data);
    },
    staleTime: 1000 * 60 * 60 * 2,
  });
};
