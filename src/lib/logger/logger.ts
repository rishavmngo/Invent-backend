import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log("Headers:", req.headers);

  if (req.method === "POST" || req.method === "PUT") {
    console.log("Request Body:", req.body);
  }

  console.log("Query Parameters:", req.query);
  next();
};

export default logger;
