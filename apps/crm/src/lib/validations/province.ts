import { z } from "zod";

export const provinceSchema = z.object({
  id: z.string().uuid(),
  code: z.coerce.number().positive().int(),
  name: z.string(),
});

export const provinceFormSchema = provinceSchema.omit({ id: true });

export type Province = z.infer<typeof provinceSchema>;
export type ProvinceFormValues = z.infer<typeof provinceFormSchema>;
