import express from "express";
import {getdestination,getdestinationById,getdestinationRegister,getdestinationUpdate,getdestinationDelete} from "../controllers/destination.js";

const router = express.Router();

router.get("/findall", getdestination);
router.get("/profile/:userId", getdestinationById);
router.post("/register", getdestinationRegister);
router.put("/update/:userId", getdestinationUpdate);
router.delete("/delete/:userId", getdestinationDelete);

export default router;
