import express from "express";
import config from "./config/config";
import authRoute from "./features/auth/auth.route";
import "./features/auth/authStrategies";
import inventoryRoutes from "./features/inventory/inventory.route";
import passport from "passport";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to invent api 0.2");
});

app.use("/auth", authRoute);
app.use(
  "/inventory",
  passport.authenticate("jwt", { session: false }),
  inventoryRoutes,
);

app.listen(config.PORT, () => {
  console.log(`Sever is running on ${config.PORT}`);
});
