import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const test = async (req: Request, res: Response) => {
  res.json({
    message: "You made it to the secure route",
    id: req.id,
    token: req.header("secret_token"),
  });
};

// export const getAllInventory = async (req: Request, res: Response) => {};
