import { loginUser,logoutUser,checkUser,updateProfile,registerUser,getUsers } from "../controllers/userController.js";
import authMiddleware from '../middlewares/authMiddleware.js'
import express from 'express'

const router = express.Router()
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/checkuser',authMiddleware,checkUser)
router.put('/update',authMiddleware,updateProfile)
router.get('/users',authMiddleware,getUsers)
router.post('/logout',logoutUser)

export default router