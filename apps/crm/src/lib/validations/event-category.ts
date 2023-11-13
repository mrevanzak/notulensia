import { z } from "zod";

export const eventCategorySchema = z.object({
  id: z.string().uuid(),
  eventCategoryName : z.string(),
});

export const eventCategoryFormSchema = eventCategorySchema.omit({id: true});

export type EventCategory = z.infer<typeof eventCategorySchema>;
export type EventCategoryFormValues = z.infer<typeof eventCategoryFormSchema>;
