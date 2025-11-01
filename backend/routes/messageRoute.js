import { sendMessage,getMessages } from "../controllers/messageController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from 'express'

const router =express.Router()
router.post('/send/:id',authMiddleware,sendMessage)
router.get('/messages/:id',authMiddleware,getMessages)


export default router