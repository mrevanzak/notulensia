import { z } from "zod";

const userDropdownSchema = z.object({
  // id: z.string().uuid(),
  name: z.string(),
});

export const addCompanyListSchema = z.object({
  code: z.string().nonempty(),
  district: z.string().nonempty(),
  name: z.string().nonempty(),
  user: userDropdownSchema
    .transform((value) => value.name)
    .pipe(z.string())
    .or(z.string()),
  address: z.string().nonempty(),
  phone: z.string().nonempty(),
  picName: z.string().nonempty(),
  picPhone: z.string().nonempty(),
  province: z.string().nonempty(),
});

export type AddCompanyList = z.infer<typeof addCompanyListSchema>;
