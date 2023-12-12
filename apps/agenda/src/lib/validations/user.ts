import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  imgUrl: z.string().nullish(),
  expiredAt: z.string().nullable(),
  status: z.string(),
});

export const optionSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export type Option = z.infer<typeof optionSchema>;
