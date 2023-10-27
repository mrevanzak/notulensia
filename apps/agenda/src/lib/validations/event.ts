import { z } from "zod";

export const eventSchema = z.object({
  id: z.string().uuid(),
  eventName: z.string(),
  date: z.string(),
  audienceGroup: z.string(),
  startAt: z
    .string()
    .datetime({ offset: true })
    .transform((value) =>
      new Date(value).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    ),
  endAt: z
    .string()
    .datetime({ offset: true })
    .transform((value) =>
      new Date(value).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    ),
});

export type Event = z.infer<typeof eventSchema>;

export const eventFormSchema = z.object({
  eventCategoryName: z.string(),
  name: z.string(),
  topic: z.string(),
  purpose: z.string(),
  preparationNotes: z.string(),
  isOnline: z.boolean(),
  locationValue: z.string(),
  startAt: z.date(),
  endAt: z.date(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
