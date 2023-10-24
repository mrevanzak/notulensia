import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  imgUrl: z.string().url(),
  expiredAt: z.string().nullable(),
  status: z.string(),
});
