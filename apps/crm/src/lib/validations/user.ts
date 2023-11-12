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

export const userFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  isCrmUser: z.boolean().default(false),
  phoneNumber: z.string(),
  status: z.string().optional(),
});

// export const updateUserFormSchema = userFormSchema.

export const userDropdownSchema = userSchema.pick({
  id: true,
  name: true,
  status: true,
});

export type User = z.infer<typeof userSchema>;
export type UserFormValues = z.infer<typeof userFormSchema>;
