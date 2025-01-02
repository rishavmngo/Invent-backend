import z from "zod";

export const PartySchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  phone_no: z.string().nullable(),
  business_id: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});
export const PartyInputSchema = PartySchema.omit({
  id: true,
  business_id: true,
  created_at: true,
  updated_at: true,
});
