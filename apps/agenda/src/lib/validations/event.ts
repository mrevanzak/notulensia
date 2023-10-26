import { z } from "zod";

export const eventSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  eventName: z.string(),
  audienceGroup: z.string(),
  startAt: z.string(),
  endAt: z.string(),
});

export type Event = z.infer<typeof eventSchema>;
