import { z } from "zod";

export const eventCategoryDropdownSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
