import jwt from 'jsonwebtoken'
const generateToken =async(id,res)=>{
    try {
        const token=jwt.sign({id},process.env.jwt_secret)
        res.cookie('jwt',token,{
            maxAge:7*24*60*60*1000, //time is in MS
            samesite:'lax',
            httpOnly:true,
            secure:false
        })

        return token
    } catch (error) {
       console.log(error) 
    }
}

export default generateToken
