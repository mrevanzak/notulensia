import { z } from "zod";

export const audienceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  totalAudience: z.number(),
});
