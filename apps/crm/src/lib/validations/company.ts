import { z } from "zod";
import { userDropdownSchema } from "./user";

export const companySchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  name: z.string(),
  address: z.string(),
  email: z.string().email(),
  picName: z.string(),
  picPhoneNumber: z.string(),
  logoUrl: z.string().nullish(),
});

export const companyFormSchema = companySchema
  .omit({
    id: true,
    logoUrl: true,
    code: true,
  })
  .extend({
    provinceId: z.string().uuid(),
    districtId: z.string().uuid(),
    userId: z.string().uuid(),
    phoneNumber: z.string(),
  });

export const updateCompanyFormSchema = companyFormSchema
  .omit({
    userId: true,
  })
  .extend({
    user: userDropdownSchema
      .pick({
        name: true,
        email: true,
        phoneNumber: true,
      })
      .extend({
        userId: z.string().uuid(),
      }),
    code: z.string(),
  })
  .transform((value) => ({
    ...value,
    userId: value.user.userId,
  }));

export type Company = z.infer<typeof companySchema>;
export type CompanyFormValues = z.infer<typeof companyFormSchema>;
