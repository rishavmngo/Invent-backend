import express from "express";
import inventoryRoutes from "./features/inventory/inventory.route";
import businessRoutes from "./features/business/business.route";
import partiesRoutes from "./features/party/party.route";
const router = express.Router();

router.use("/inventory", inventoryRoutes);
router.use("/business", businessRoutes);
router.use("/party", partiesRoutes);

export default router;
