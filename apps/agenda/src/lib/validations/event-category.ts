import { z } from "zod";

export const eventCategoryDropdownSchema = z.object({
  id: z.string().uuid(),
  eventCategoryName: z.string(),
});

export const eventCategorySchema = z.object({
  id: z.string().uuid(),
  eventCategoryName : z.string().nullish(),
})
export type EventCategorySchema = z.infer<typeof eventCategorySchema>

export const eventCategorySchemaForm = eventCategorySchema.omit({id : true});
export type EventCategorySchemaForm = z.infer<typeof eventCategorySchemaForm>