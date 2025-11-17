import { postArticle,getAllArticles,getUserArticles,updateArticle,deleteArticle,getSingleArticle } from "../controllers/articleController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from 'express'

const router=express.Router()
router.post('/post',authMiddleware,postArticle)
router.get('/all-articles',getAllArticles)
router.get('/user-articles',authMiddleware,getUserArticles)
router.put('/update/:id',authMiddleware,updateArticle)
router.get('/single-article/:id',authMiddleware,getSingleArticle)
router.delete('/delete/:id',authMiddleware,deleteArticle)

export default router