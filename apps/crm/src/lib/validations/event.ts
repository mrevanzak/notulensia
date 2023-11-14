import moment from "moment";
import { z } from "zod";

export const eventSchema = z.object({
  id: z.string().uuid(),
  eventName: z.string(),
  isOnline: z.boolean(),
  startAt: z
    .string()
    .datetime()
    .transform((date) => moment(date).format("YYYY-MM-DD")),
  endAt: z
    .string()
    .datetime()
    .transform((date) => moment(date).format("YYYY-MM-DD")),
});

export type Event = z.infer<typeof eventSchema>;
