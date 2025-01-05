import { Inventory_transaction_type, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { InventoryInputSchema } from "./inventory.schema";

const prisma = new PrismaClient();

export const getAllInventory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const items = await prisma.$queryRaw`
 SELECT 
    i.id,
    i.name,
    i.purchase_price,
    i.sell_price,
    COALESCE(SUM(
      CASE 
        WHEN it.transaction_type = 'REDUCE' THEN -it.adjust_quantity 
        ELSE it.adjust_quantity 
      END
    ), 0)::integer as total_quantity
  FROM "Inventory" i
  LEFT JOIN "Inventory_transaction" it ON i.id = it.inventory_id
  WHERE i.business_id = ${req.id}
  GROUP BY i.id, i.name, i.purchase_price, i.sell_price
`;
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const addInventory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { opening_stock, price_per_unit, ...item } =
      InventoryInputSchema.parse(req.body);

    const inventoryItem = await prisma.inventory.create({
      data: {
        business_id: req.id,
        name: item.name,
        purchase_price: item.purchase_price,
        sell_price: item.sell_price,
        tax_rate: item.tax_rate,
        quantity: item.quantity,
        min_quantity: item.min_quantity,
      },
    });
    console.log("inventory item created", inventoryItem);

    if (opening_stock) {
      //create a opening stock transaction
      const trans = await prisma.inventory_transaction.create({
        data: {
          transaction_type: Inventory_transaction_type.OPEN,
          adjust_quantity: opening_stock,
          price_per_unit: price_per_unit,
          inventory_id: inventoryItem.id,
          business_id: req.id,
        },
      });

      console.log("inventory trans. created", trans);
    }
    res.json({
      message: "Added successfully",
    });
  } catch (error) {
    next(error);
  }
};
