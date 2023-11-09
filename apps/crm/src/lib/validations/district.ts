import type { z } from "zod";
import { provinceSchema } from "./province";

export const districtSchema = provinceSchema;

export const districtFormSchema = districtSchema.omit({ id: true }).extend({
  province: provinceSchema,
});

export type District = z.infer<typeof districtSchema>;
export type DistrictFormValues = z.infer<typeof districtFormSchema>;
