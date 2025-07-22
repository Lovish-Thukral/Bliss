import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";

const Chatrouter = Router();

Chatrouter.post('/chat', chatController)

export default Chatrouter;
