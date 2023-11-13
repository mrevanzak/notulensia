import { z } from "zod";

export const scheduleProgramSchema = z
  .object({
    startTime: z.string().or(z.date()),
    endTime: z.string().or(z.date()),
    activity: z.string(),
    picName: z.string(),
    date: z.string().or(z.date()),
    note: z.string().optional().nullable(),
    position: z.number().optional(),
  })
  .refine((data) => data.startTime <= data.endTime, {
    message: "End time must be greater than start time",
    path: ["endTime"],
  });

export type ScheduleProgram = z.infer<typeof scheduleProgramSchema>;
