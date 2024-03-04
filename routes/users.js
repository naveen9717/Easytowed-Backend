import express from "express";
import { getUserById,getUserUpdate,getUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUserById);
router.get("/findall", getUsers);
router.put("/update/:userId", getUserUpdate);


export default router;
