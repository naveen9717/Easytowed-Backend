import express from "express";
import { getUserById,getUserUpdate } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUserById);
router.put("/update/:userId", getUserUpdate);


export default router;
