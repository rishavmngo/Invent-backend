import express from "express";
import { addParty, getAllParties } from "./party.controller";

const router = express.Router();

router.get("/getall", getAllParties);
router.post("/add", addParty);

const partiesRoutes = router;
export default partiesRoutes;
