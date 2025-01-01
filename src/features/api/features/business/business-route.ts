import express from "express";
import { getBusiness } from "./business-controller";

const router = express.Router();

router.get("/", getBusiness);

const businessRoutes = router;
export default businessRoutes;
