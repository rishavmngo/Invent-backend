import express, { Request } from "express";
import config from "./config/config";
import authRoute from "./features/auth/auth-route";
import cors from "cors";
import "./features/auth/auth-strategies";
import passport from "passport";
import apiRoutes from "./features/api/api-route";
import logger from "./lib/logger/logger";
import "./types/types";

const app = express();

const corsOptions = {
  origin: "*",
  // origin: "http://localhost:5500", // Allow only requests from this origin
  // methods: "GET,POST", // Allow only these methods
  // allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Welcome to invent api 0.2");
});

app.use("/auth", authRoute);

app.use(
  "/api",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res, next) => {
    req.id = (req.user as { id: number }).id;

    next();
  },
  apiRoutes,
);

app.listen(config.PORT, () => {
  console.log(`Sever is running on ${config.PORT}`);
});
