import express from "express";
import inventoryRoutes from "../inventory/inventory.route";
const router = express.Router();

router.use("/inventory", inventoryRoutes);

export default router;
