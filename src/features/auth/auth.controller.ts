import passport from "passport";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "login",
    async (
      err: Error,
      user: { id: string; email: string },
      info: { message: string },
    ) => {
      try {
        if (err || !user) {
          const error = new Error("An error occurred.");

          return next(error);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { id: user.id, email: user.email };
          const token = jwt.sign({ user: body }, "TOP_SECRET");

          return res.json({ token, message: info.message });
        });
      } catch (error) {
        return next(error);
      }
    },
  )(req, res, next);
};

export const signup = async (req: Request, res: Response) => {
  res.json({
    message: "Signed successful",
    user: req.user,
  });
};
