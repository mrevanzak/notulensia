import { z } from "zod";
import { audienceDropdownSchema, audienceFormSchema } from "./audience";
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
  phase: z.string().nullish(),
});

export type Event = z.infer<typeof eventSchema>;

export const eventFormSchema = z.object({
  eventCategoryName: z.string(),
  name: z.string(),
  topic: z.string(),
  purpose: z.string(),
  preparationNotes: z.string().optional().nullish(),
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
  locationValue: z.string().nullish(),
  address: z.string().nullish(),
  schedules: scheduleProgramSchema.array().optional(),
  province: z.string().nullish(),
  district: z.string().nullish(),
  audienceNames: audienceDropdownSchema.array().optional(),
  files: storageSchema.array().optional(),
  audienceUsers: audienceFormSchema.array().optional(),
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

export const attendHistorySchema = audienceFormSchema
  .omit({
    isAttend: true,
  })
  .extend({
    attendedAt: z
      .string()
      .datetime()
      .transform((value) => new Date(value)),
  });

export type AttendHistory = z.infer<typeof attendHistorySchema>;
export type EventFormValues = z.infer<typeof eventFormSchema>;


export const createLinkGmeetSchema = z.object({
  startAt: z.string(),
  endAt: z.string(),
  eventName: z.string(),
  description: z.string(),
  reqId: z.string(),
  users: z.array(z.string()),
});

export type CreateLinkGmeet = z.infer<typeof createLinkGmeetSchema>;
