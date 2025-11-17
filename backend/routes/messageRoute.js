import { sendMessage,getMessages,getUsersOnChat } from "../controllers/messageController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from 'express'

const router =express.Router()
router.post('/send/:id',authMiddleware,sendMessage)
router.get('/users',authMiddleware,getUsersOnChat)
router.get('/:id',authMiddleware,getMessages)


export default router