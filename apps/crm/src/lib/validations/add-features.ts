import { z } from "zod";

export const addFeaturesSchema = z.object({
  name: z.string().nonempty(),
  level: z.string().nonempty(),
  price: z.number().default(0),
  duration: z.string().nonempty(),
  status: z.string().nonempty(),
});

export type AddFeatures = z.infer<typeof addFeaturesSchema>;
