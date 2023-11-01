import moment from "moment";
import { z } from "zod";
import { districtSchema } from "./district";
import { provinceSchema } from "./province";
import { scheduleProgramSchema } from "./schedule-program";

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
  startAt: z
    .date()
    .transform((value) => moment(value).format("YYYY-MM-DD HH:mm:ss")),
  endAt: z
    .date()
    .transform((value) => moment(value).format("YYYY-MM-DD HH:mm:ss")),
  isOnline: z.boolean(),
  linkUrl: z.string().url().optional(),
  locationValue: z.string(),
  province: provinceSchema.optional(),
  district: districtSchema.optional(),
  audienceGroup: z.string().array(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
