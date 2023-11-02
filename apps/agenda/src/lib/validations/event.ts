import moment from "moment";
import { z } from "zod";
import { districtSchema } from "./district";
import { eventCategoryDropdownSchema } from "./event-category";
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
  eventCategoryName: z.string().or(eventCategoryDropdownSchema),
  name: z.string(),
  topic: z.string(),
  purpose: z.string(),
  preparationNotes: z.string(),
  startAt: z.coerce
    .date()
    .transform((value) => moment(value).format("YYYY-MM-DD HH:mm:ss")),
  endAt: z.coerce
    .date()
    .transform((value) => moment(value).format("YYYY-MM-DD HH:mm:ss")),
  isOnline: z.boolean(),
  linkUrl: z.string().url().optional().nullable(),
  locationValue: z.string(),
  schedules: scheduleProgramSchema.array().optional(),
});

export const insertEventFormSchema = eventFormSchema.extend({
  province: provinceSchema.optional().nullable(),
  district: districtSchema.optional().nullable(),
  audienceNames: z.string().array().optional(),
});

export const updateEventFormSchema = eventFormSchema.extend({
  province: z.string().optional().nullable(),
  provinceCode: z.number().optional().nullable(),
  district: z.string().optional().nullable(),
  districtCode: z.number().optional().nullable(),
  audiences: z
    .object({
      audienceId: z.string(),
      audienceName: z.string(),
    })
    .array()
    .optional()
    .nullable(),
});

export type EventFormValues = z.infer<typeof insertEventFormSchema>;
