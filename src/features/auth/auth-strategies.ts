import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  Strategy as JWTstrategy,
  ExtractJwt as ExtractJWT,
} from "passport-jwt";
const prisma = new PrismaClient();

export const verifyPassword = async (
  user_password: string,
  password: string,
) => {
  return await bcrypt.compare(password, user_password);
};
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const encryptedPassword = await hashPassword(password);
      try {
        const user = await prisma.business.create({
          data: { email, password: encryptedPassword },
        });

        const body = { id: user.id };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return done(null, token);
      } catch (error) {
        done(error);
      }
    },
  ),
);
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.business.findFirst({ where: { email } });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const validate = await verifyPassword(user.password, password);

        // const validate = dcrypted_password === user.password;

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    },
  ),
);
passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromHeader("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);
