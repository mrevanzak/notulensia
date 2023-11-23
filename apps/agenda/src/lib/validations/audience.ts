import { z } from "zod";

export const audienceGroupSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  totalAudience: z.number(),
});

export const audienceFormSchema = z.object({
  name: z.string(),
  job: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  description: z.string().optional(),
});

export const audienceGroupFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  audiences: audienceFormSchema.array().optional(),
});

export const audienceDropdownSchema = z.object({
  id: z.string().uuid(),
  audienceName: z.string(),
});

export type AudienceFormValues = z.infer<typeof audienceGroupFormSchema>;
export type Audience = z.infer<typeof audienceFormSchema>;
export type AudienceGroup = z.infer<typeof audienceGroupSchema>;
export type AudienceDropdown = z.infer<typeof audienceDropdownSchema>;
