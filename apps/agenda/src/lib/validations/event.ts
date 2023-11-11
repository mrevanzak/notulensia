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
      new Date(value).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
      }),
    ),
  endAt: z
    .string()
    .datetime({ offset: true })
    .transform((value) =>
      new Date(value).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
      }),
    ),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]),
});

export type Event = z.infer<typeof eventSchema>;

export const eventFormSchema = z.object({
  eventCategoryName: eventCategoryDropdownSchema
    .transform((value) => value.eventCategoryName)
    .pipe(z.string())
    .or(z.string()),
  name: z.string(),
  topic: z.string(),
  purpose: z.string(),
  preparationNotes: z.string(),
  startAt: z
    .string()
    .datetime()
    .transform((value) => new Date(value))
    .or(z.date()),
  endAt: z
    .string()
    .datetime()
    .transform((value) => new Date(value))
    .or(z.date()),
  isOnline: z.boolean().default(false),
  linkUrl: z.string().url().optional().nullable(),
  locationValue: z.string(),
  address: z.string().nullish(),
  schedules: scheduleProgramSchema.array().optional(),
  province: provinceSchema
    .transform((value) => value.province)
    .or(z.string())
    .nullish(),
  district: districtSchema
    .transform((value) => value.district)
    .or(z.string())
    .nullish(),
  audienceNames: z.string().array().optional(),
});

export const updateEventFormSchema = eventFormSchema
  .extend({
    status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]),
    audiences: z
      .object({
        audienceId: z.string(),
        audienceName: z.string(),
      })
      .array()
      .optional()
      .nullable(),
  })
  .transform((value) => ({
    ...value,
    audienceNames: value.audiences?.map((audience) => audience.audienceName),
  }));

export const eventCalendarSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  startAt: z
    .string()
    .datetime()
    .transform((value) => new Date(value)),
  isOnline: z.boolean(),
});

export const eventCalendarDetailSchema = eventFormSchema.omit({
  audienceNames: true,
  district: true,
  province: true,
  address: true,
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
