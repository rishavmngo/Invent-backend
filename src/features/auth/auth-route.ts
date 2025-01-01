import express from "express";
import passport from "passport";
import { login, signup } from "./auth-controller";

const router = express();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  signup,
);

router.post("/login", login);

export default router;
