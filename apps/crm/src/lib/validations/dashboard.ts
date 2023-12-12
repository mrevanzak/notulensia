import moment from "moment";
import { z } from "zod";
import { profileSchema } from "./user";

export const dashboardSchema = z.object({
  companyTotal: z.number(),
  userTotal: z.number(),
  totalEvents: z.number(),
  statistics: z
    .object({
      day: z.string(),
      value: z.coerce.number(),
    })
    .array(),
  nearExpiredUsers: profileSchema
    .pick({
      name: true,
      imgUrl: true,
      status: true,
    })
    .extend({
      dateExpired: z
        .string()
        .datetime()
        .transform((date) => moment(date).format("DD MMMM YYYY")),
    })
    .array(),
});
