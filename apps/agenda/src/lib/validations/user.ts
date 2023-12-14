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

export const optionFormSchema = z.object({
  notification: z.string(),
  dashboard: z.string(),
  logoUrl: z.string().uuid().optional(),
});

export type OptionFormValues = z.infer<typeof optionFormSchema>;

export const optionSchema = z.object({
  logoUrl: z.string().nullish(),
  userOptions: z.array(
    z.object({
      name: z.enum(["notification", "dashboard"]),
      value: z.string(),
    }),
  ),
});
