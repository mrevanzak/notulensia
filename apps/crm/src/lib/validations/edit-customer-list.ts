import { z } from "zod";

const featureDropdownSchema = z.object({
  // id: z.string().uuid(),
  feature: z.string(),
});
const companyDropdownSchema = z.object({
  // id: z.string().uuid(),
  company: z.string(),
});

export const editCustomerListSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty().email(),
  feature: featureDropdownSchema
    .transform((value) => value.feature)
    .pipe(z.string())
    .or(z.string()),
  company: companyDropdownSchema
    .transform((value) => value.company)
    .pipe(z.string())
    .or(z.string()),
  status: z.string().nonempty(),
});

export type EditCustomerList = z.infer<typeof editCustomerListSchema>;
