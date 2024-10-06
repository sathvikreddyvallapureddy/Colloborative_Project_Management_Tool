import express from "express";
import { accessChat, fetchChat } from "../contollers/chatController.js";
import { protectRoute } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/", protectRoute, accessChat);
router.get("/", protectRoute, fetchChat);

export default router;
