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
    const items = await prisma.inventory.findMany({
      where: {
        business_id: req.id,
      },
    });
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

    if (opening_stock) {
      //create a opening stock transaction
      await prisma.inventory_transaction.create({
        data: {
          transaction_type: Inventory_transaction_type.OPEN,
          adjust_quantity: opening_stock,
          price_per_unit: price_per_unit,

          inventory_id: inventoryItem.id,
          business_id: req.id,
        },
      });
    }
    res.send("success");
  } catch (error) {
    next(error);
  }
};
