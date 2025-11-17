import jwt from 'jsonwebtoken'
const generateToken =async(id,res)=>{
    try {
        const token=jwt.sign({id},process.env.jwt_secret)
        res.cookie('jwt',token,{
            maxAge:7*24*60*60*1000, //time is in MS
            samesite:'lax',// this should be none during production
            httpOnly:true,
            secure:false //And this should be true during production
        })

        return token
    } catch (error) {
       console.log(error) 
    }
}

export default generateToken
