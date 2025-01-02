import z from "zod";

export const InventorySchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  purchase_price: z.number().optional(),
  sell_price: z.number().optional(),
  tax_rate: z.number().optional(),
  quantity: z.number().optional(),
  min_quantity: z.number().optional(),
  business_id: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const InventoryInputSchema = InventorySchema.omit({
  id: true,
  business_id: true,
  created_at: true,
  updated_at: true,
}).extend({
  opening_stock: z.number().nullable(),
  price_per_unit: z.number().nullable(),
});
