import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getBusiness = async (req: Request, res: Response) => {
  const result = await prisma.business.findFirst({
    omit: {
      password: true,
    },
    where: {
      id: {
        equals: req.id,
      },
    },
  });
  res.json(result);
};

export const updateBusiness = async (req: Request, res: Response) => {
  const { name } = req.body;
  const result = await prisma.business.update({
    where: {
      id: req.id,
    },
    data: {
      name: name,
    },
  });
  res.json(result);
};
