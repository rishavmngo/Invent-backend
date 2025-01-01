import express from "express";
import inventoryRoutes from "./features/inventory/inventory-route";
import businessRoutes from "./features/business/business-route";
const router = express.Router();

router.use("/inventory", inventoryRoutes);
router.use("/business", businessRoutes);

export default router;
