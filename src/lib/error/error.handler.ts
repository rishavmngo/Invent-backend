import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "./AppError";
import dotenv from "dotenv";
dotenv.config();

interface ErrorResponse {
  status: string;
  message: string;
  errors?: unknown;
}

const handleZodError = (err: ZodError) => {
  const errors = err.errors.map((error) => ({
    field: error.path.join("."),
    message: error.message,
  }));

  return new AppError(
    "Validation Error",
    400,
    errors, // Pass the formatted errors to AppError
  );
};

const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError) => {
  console.log("at least");
  switch (err.code) {
    case "P2002": {
      const target = (err.meta?.target as string[]) || [];
      const field = target[0] || "field";

      return new AppError(`A record with this ${field} already exists`, 400, [
        {
          field,
          message: `This ${field} is already taken`,
        },
      ]);
    }
    case "P2014":
      return new AppError("Invalid ID", 400);
    case "P2003":
      return new AppError("Invalid input data", 400);
    default:
      return new AppError("Database error occurred", 500);
  }
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  // Log error for debugging (in development)
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", err);
  }

  // Handle specific error types
  if (err instanceof ZodError) {
    error = handleZodError(err);
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    error = handlePrismaError(err);
  } else if (!(err instanceof AppError)) {
    // For unknown errors, create a generic AppError
    error = new AppError(
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : (err as AppError).message,
      500,
    );
  }

  const appError = error as AppError;
  const response: ErrorResponse = {
    status: appError.status,
    message: appError.message,
  };

  // Include error details in development
  if (process.env.NODE_ENV === "development" && err instanceof ZodError) {
    response.errors = err.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));
  }

  res.status(appError.statusCode).json(response);
};
