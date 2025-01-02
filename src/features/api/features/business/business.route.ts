import express from "express";
import { getBusiness, updateBusiness } from "./business.controller";

const router = express.Router();

router.get("/", getBusiness);
router.put("/", updateBusiness);

const businessRoutes = router;
export default businessRoutes;
