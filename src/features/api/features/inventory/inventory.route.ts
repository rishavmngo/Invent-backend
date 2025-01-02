import express from "express";
import { addInventory, getAllInventory } from "./inventory.controller";

const inventoryRoutes = express.Router();

inventoryRoutes.get("/getAll", getAllInventory);
inventoryRoutes.post("/add", addInventory);

export default inventoryRoutes;
