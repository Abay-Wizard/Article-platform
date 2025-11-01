import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import articleRoute from './routes/articleRoute.js'
import messageRoute from './routes/messageRoute.js'

dotenv.config()
const app=express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser())
app.use('/api/user',userRoute)
app.use('/api/article',articleRoute)
app.use('/api/message',messageRoute)


connectDB().then(()=>{
    app.listen(5000,()=>{
        console.log('Server is running on port 5000 ...!')
    })
})


