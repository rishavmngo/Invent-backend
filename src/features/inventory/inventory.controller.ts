import { Request, Response } from "express";

export const test = async (req: Request, res: Response) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.header("secret_token"),
  });
};
