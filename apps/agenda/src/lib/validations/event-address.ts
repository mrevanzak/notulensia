import { z } from "zod";
import { provinceSchema } from "./province";
import { districtSchema } from "./district";

// get List
export const eventAddressSchema = z.object({
    id: z.string().uuid(),
    location : z.string(),
    districtName : z.string().nullable()
})

export type EventAddress = z.infer<typeof eventAddressSchema>;

export const eventAddressFormSchema = z.object({
    id : z.string().uuid().nullish(),
    location: z.string().nullish(),
    provinceId : z.string().uuid().nullish(),
    districtId : z.string().uuid().nullish(),
    address : z.string().nullish(),
})

export type EventAddressForm = z.infer<typeof eventAddressFormSchema>;

