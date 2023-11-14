import moment from "moment";
import { z } from "zod";

export const tierSchema = z.object({
  id: z.string().uuid(),
  tierName: z.string(),
  duration: z.number(),
  isValid: z.boolean(),
  startAt: z
    .string()
    .datetime()
    .transform((date) => moment(date).format("YYYY-MM-DD")),
  endAt: z
    .string()
    .datetime()
    .transform((date) => moment(date).format("YYYY-MM-DD")),
});
