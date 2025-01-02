import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { PartyInputSchema } from "./party.schema";

const prisma = new PrismaClient();

export const getAllParties = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = prisma.party.findMany({
      where: {
        business_id: {
          equals: req.id,
        },
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const addParty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = PartyInputSchema.parse(req.body);

    const result = await prisma.party.create({
      data: {
        email: data.email,
        phone_no: data.phone_no,
        name: data.name,
        business_id: req.id,
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
