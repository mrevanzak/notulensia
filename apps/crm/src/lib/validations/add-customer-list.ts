import { z } from "zod";

export const addCustomerListSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(8).max(20),
  phone: z.string().nonempty(),
});

export type AddCustomerList = z.infer<typeof addCustomerListSchema>;
