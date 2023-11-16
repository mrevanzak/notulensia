import moment from "moment";
import { z } from "zod";

export const tierSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  level: z.coerce.number(),
  price: z.coerce.number(),
  duration: z.coerce.number(),
  status: z.string(),
});

export const tierFormSchema = tierSchema.omit({ id: true });

export const tierDropdownSchema = tierSchema.pick({
  id: true,
  name: true,
  level: true,
});

export const tierHistorySchema = z.object({
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

export type Tier = z.infer<typeof tierSchema>;
export type TierFormValues = z.infer<typeof tierFormSchema>;
