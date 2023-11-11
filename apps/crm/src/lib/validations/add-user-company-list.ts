import { z } from "zod";

export const addUserCompanyListSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(8).max(20),
});

export type AddUserCompanyListType = z.infer<typeof addUserCompanyListSchema>;
