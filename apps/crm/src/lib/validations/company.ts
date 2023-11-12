import { z } from "zod";
import { districtSchema } from "./district";
import { provinceSchema } from "./province";

export const companySchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  name: z.string(),
  address: z.string(),
  email: z.string().email(),
  picName: z.string(),
  picPhoneNumber: z.string(),
  logoUrl: z.string().url().nullish(),
});

export const userDropdownSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  status: z.string(),
});

export const companyFormSchema = companySchema
  .omit({
    id: true,
    logoUrl: true,
    code: true,
  })
  .extend({
    province: provinceSchema,
    district: districtSchema,
    user: userDropdownSchema,
    phoneNumber: z.string(),
  });

export const userFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  isCrmUser: z.boolean().default(false),
  phoneNumber: z.string(),
});

export type Company = z.infer<typeof companySchema>;
export type CompanyFormValues = z.infer<typeof companyFormSchema>;
export type UserFormValues = z.infer<typeof userFormSchema>;
