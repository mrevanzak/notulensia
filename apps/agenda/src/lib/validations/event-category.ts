import { z } from "zod";

export const eventCategoryDropdownSchema = z.object({
  id: z.string().uuid(),
  eventCategoryName: z.string(),
});
