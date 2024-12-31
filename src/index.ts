import express from "express";
import config from "./config/config";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to invent api 0.2");
});

app.listen(config.PORT, () => {
  console.log(`Sever is running on ${config.PORT}`);
});
