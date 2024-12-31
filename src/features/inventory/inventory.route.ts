import express from "express";
import { test } from "./inventory.controller";

const inventoryRoutes = express.Router();

inventoryRoutes.get("/", test);

export default inventoryRoutes;
