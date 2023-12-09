import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  registeredAt: z.string().nullish(),
  expiredAt: z.string().nullish(),
  status: z.string(),
});

export const profileSchema = userSchema
  .omit({
    registeredAt: true,
    expiredAt: true,
  })
  .extend({
    imgUrl: z.string().nullish(),
  });

export const userActivitySchema = z.object({
  id: z.string().uuid(),
  activity: z.string(),
  description: z.string(),
  isCrm: z.boolean(),
});

export const userFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  isCrmUser: z.boolean().default(false),
  phoneNumber: z.string(),
  status: z.string().optional(),
  tierId: z.string().uuid().optional(),
});

export const userDropdownSchema = userSchema.pick({
  id: true,
  name: true,
  status: true,
});

export const insertUserReturnSchema = userDropdownSchema.omit({
  status: true,
});

export type User = z.infer<typeof userSchema>;
export type UserFormValues = z.infer<typeof userFormSchema>;
export type UserActivity = z.infer<typeof userActivitySchema>;
