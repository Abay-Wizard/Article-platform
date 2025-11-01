import {create} from 'zustand'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'
export const userStore=create((set,get)=>({
    isCheckingUser:false,
    user:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    checkUser:async()=>{
        set({isCheckingUser:true})
        try {
            const res=await axiosInstance.get('/user/checkuser')
            if(res.data.success){
                set({user:res.data.data})
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
        }finally{
          set({isCheckingUser:false})
        }

    },
    SignUp:async(data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post('/user/register',data)
            if(res.data.success){
                set({user:res.data.data})
                toast.success(res.data.message)
                 return true
            }
           return false
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            return false
        }finally{
            set({isSigningUp:false})
        }
    },

    Login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post('/user/login',data)
            if(res.data.success){
                set({user:res.data.data})
                toast.success(res.data.message)
                return true
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            return false
        }finally{
          set({isLoggingIn:false})
        }
    },
    
    Logout:()=>{
       set({user:null})
    },

    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put('/user/update',data)
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }finally{
            set({isUpdatingProfile:false})
        }
    }


}))