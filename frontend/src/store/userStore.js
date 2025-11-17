import { create } from 'zustand'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'
import {io} from 'socket.io-client'
const baseURL='http://localhost:5000'
export const userStore = create((set, get) => ({
    isCheckingUser: false,
    user: null,
    socket:null,
    users:[],
    isFetchingUsers:false,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    checkUser: async () => {
        set({ isCheckingUser: true })
        try {
            const res = await axiosInstance.get('/user/checkuser')
            if (res.data.success) {
                set({ user: res.data.data })
                get().connectSocket()
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
        } finally {
            set({ isCheckingUser: false })
        }

    },
    fetchUsers:async()=>{
       set({isFetchingUsers:true})
       try {
        const res=await axiosInstance.get('/user/users')
        if(res.data.success){
            set({users:res.data.data})
        }
       } catch (error) {
        console.log(error.message)
        toast.error(error?.response?.data?.message)
       }finally{
        set({isFetchingUsers:false})
       }
    },

    SignUp: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/user/register', data)
            if (res.data.success) {
                set({ user: res.data.data })
                get().connectSocket()
                toast.success(res.data.message)
                return true
            }
            return false
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            return false
        } finally {
            set({ isSigningUp: false })
        }
    },

    Login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('/user/login', data)
            if (res.data.success) {
                set({ user: res.data.data })
                get().connectSocket()
                toast.success(res.data.message)
                return true
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            return false
        } finally {
            set({ isLoggingIn: false })
        }
    },

    Logout: async() => {
        try {
           const res=await axiosInstance.post('/user/logout')
           if(res.data.success){
            set({ user: null })
            get().disconnectSocket()
            toast.success(res.data.message)
           }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
        
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put('/user/update', data)
            if (res.data.success) {
                set({user:{...get().user,...res.data.data}})// this is the line who saved me from burnout.
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket:()=>{
       const user=get().user
       if(!user ||get().socket) return
       const socket=io(baseURL,{
        query:{
            userId:user?._id
        }
       })
      set({socket:socket})
    },

    disconnectSocket:()=>{
        const socket=get().socket
        if(socket){
            socket.disconnect()
        }
        set({socket:null})
    }


}))