import express from "express";
import {getVenues,getVenueId,getVenueRegister,getVenueUpdate,getVenueDelete} from "../controllers/venue.js";

const router = express.Router();

router.get("/findall", getVenues);
router.get("/profile/:userId", getVenueId);
router.post("/register", getVenueRegister);
router.put("/update/:userId", getVenueUpdate);
router.delete("/delete/:userId", getVenueDelete);




export default router;
