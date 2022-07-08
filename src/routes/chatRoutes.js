import express from "express";
import  chatControllers from "../controllers/chatControllers";

const router= express.Router();

router.get('/', chatControllers.getAllChatMessages)

export default router;