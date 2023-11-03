import moment from "moment";
import { z } from "zod";

export const scheduleProgramSchema = z
  .object({
    startTime: z
      .string()
      .or(
        z.coerce.date().transform((value) => moment(value).format("HH:mm:ss")),
      ),
    endTime: z
      .string()
      .or(
        z.coerce.date().transform((value) => moment(value).format("HH:mm:ss")),
      ),
    activity: z.string(),
    picName: z.string(),
    date: z.coerce
      .date()
      .transform((value) => moment(value).format("YYYY-MM-DD")),
    note: z.string().optional().nullable(),
    position: z.number().optional(),
  })
  .refine((data) => data.startTime <= data.endTime, {
    message: "End time must be greater than start time",
    path: ["endTime"],
  });

export type ScheduleProgram = z.infer<typeof scheduleProgramSchema>;
