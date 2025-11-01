import { loginUser,logoutUser,checkUser,updateProfile,registerUser } from "../controllers/userController.js";
import authMiddleware from '../middlewares/authMiddleware.js'
import express from 'express'

const router = express.Router()
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/checkuser',authMiddleware,checkUser)
router.put('/update',updateProfile)
router.post('/logout',logoutUser)

export default router