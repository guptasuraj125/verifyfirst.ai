import express from "express";
import { chatBotReply } from "../controllers/chatbot.message.js";

const router = express.Router();

// ✅ CHAT API
router.post("/message", chatBotReply);

export default router;
