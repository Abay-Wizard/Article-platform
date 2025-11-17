import User from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import generateToken from "../lib/generateToken.js";
import cloudinary from "../config/cloudinary.js";

const registerUser=async(req,res)=>{
    const {fullName,email,password,confirmPassword,profession} =req.body
    try {
       if(!fullName || !email ||!password ||!confirmPassword ||!profession){
        return res.status(401).json({success:false,message:'All fields are required!'})
       }
       const exist= await User.findOne({email})
       if(exist){
        return res.status(401).json({success:false,message:'Account already exists!'})
       }
       if(!validator.isEmail(email)){
        return res.status(401).json({success:false,message:'Please enter a valid email address!'})
       }
      if(password !==confirmPassword){
        return res.status(401).json({success:false,message:'Your password must much!'})
      }
       const salt =await bcrypt.genSalt(10)
       const hashedPassword=await bcrypt.hash(password,salt)

       const newUser=new User({
        fullName,
        profession,
        email,
        password:hashedPassword
       })
      if(!newUser){
        return res.status(401).json({success:false,message:'Invalid credintials!'})
      }
      await newUser.save()
      generateToken(newUser._id,res)
      res.status(201).json({success:true, message:'User registered succussfully!',data:newUser})
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({success:false,message:"Internal server error!"})
    }
}


const loginUser =async(req,res)=>{
    const {email,password} =req.body
    try {
        const user= await User.findOne({email})
        if(!user){
            return res.status(401).json({success:false,message:'Invalid email or password!'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({success:false,message:'Invalid email or password!'})
        }
        generateToken(user._id,res)
        res.status(200).json({success:true,message:'Login successfull!',data:user})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:'Internal server error!'})
    }
}

const checkUser=async(req,res)=>{
    try {
        const user=req.user
        res.status(200).json({success:true,message:'User is authorized!',data:user})
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({success:false,message:'Internal server error!'})
    }
}

const getUsers=async(_,res)=>{
    try {
        const users=await User.find().sort({createdAt:-1})
        res.status(200).json({success:true,message:'Users fetched successfully!',data:users})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:'Internal server error!'})
    }
}

const updateProfile = async (req, res) => {
    const { profilePic, fullName, profession } = req.body

    try {
        const userId = req.user?._id
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        if (!profilePic || !fullName || !profession) {
            return res.status(400).json({ success: false, message: 'Picture, name, and profession are required!' })
        }

        const cloudResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: cloudResponse.secure_url, fullName, profession },
            { new: true }
        )
        
        res.status(201).json({
            success: true,
            message: 'Profile updated successfully!',
            data: updatedUser 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Server error', error: error.message })
    }
}


const logoutUser=async(_,res)=>{
    try {
        res.cookie('jwt','',{
            maxAge:0
        })
        res.status(200).json({success:true,message:'Logout successfull!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({})
    }
}

export {loginUser,logoutUser,registerUser,checkUser,updateProfile,getUsers}