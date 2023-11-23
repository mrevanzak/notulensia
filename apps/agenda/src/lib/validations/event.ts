import { z } from "zod";
import { audienceDropdownSchema } from "./audience";
import { scheduleProgramSchema } from "./schedule-program";
import { storageSchema } from "./storage";

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
  eventCategoryName: z.string(),
  name: z.string(),
  topic: z.string(),
  purpose: z.string(),
  preparationNotes: z.string().optional(),
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
  province: z.string().nullish(),
  district: z.string().nullish(),
  audienceNames: audienceDropdownSchema.array().optional(),
  files: storageSchema.array().optional(),
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
    phase: z.enum(["PRE", "ONGOING", "POST"]),
  })
  .transform((value) => ({
    ...value,
    audienceNames: value.audiences?.map((audience) => ({
      id: audience.audienceId,
      audienceName: audience.audienceName,
    })),
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
