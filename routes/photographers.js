import express from "express";
import {getPhotographers,getPhotographersById,getPhotographerRegister,getPhotographerUpdate,getPhotographerDelete} from "../controllers/photographer.js";

const router = express.Router();

router.get("/findall", getPhotographers);
router.get("/profile/:userId", getPhotographersById);
router.post("/register", getPhotographerRegister);
router.put("/update/:userId", getPhotographerUpdate);
router.delete("/delete/:userId", getPhotographerDelete);

export default router;
