import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { userStore } from "./userStore";
export const messageStore=create((set,get)=>({
    messages:[],
    selectedUser:null,
    onlineUsers:[],
    isFetchingMessages:false,
    isFetchingOnlineUsers:false,
    isSendingMessage:false,
    sendMessage:async(id,data)=>{
        set({isSendingMessage:true})
        try {
            const res=await axiosInstance.post(`/message/send/${id}`,data)
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            
        }finally{
            set({isSendingMessage:false})
        }
    },
    
    fetchMessages:async(id)=>{
        set({isFetchingMessages:true})
        try {
           const res=await axiosInstance.get(`/message/${id}`) 
           if(res.data.success){
            set({messages:res.data.data})
           }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }finally{
           set({isFetchingMessages:false})
        }
    },

    fetchOnlineUsers:async()=>{
       set({isFetchingOnlineUsers:true})
       try {
         const socket=userStore.getState().socket
         socket.on('getOnlineUsers',(userIds)=>{
            set({onlineUsers:userIds})
         })
        
       } catch (error) {
        console.log(error)
        toast.error('Faild to fetch online users!')
       }finally{
         set({isFetchingOnlineUsers:false})
       }
    },
    
    subscribeToMessages:()=>{
        const socket=userStore.getState().socket
        try {
            socket.on('newMessage',(newMessage)=>{
                set({messages:[...get().messages, newMessage]})
            })
        } catch (error) {
            console.log(error)
            toast.error('Realtime communication failed!')
        }
    },

    unSubscribeToMessages:()=>{
       try {
         const socket=userStore.getState().socket
         if(socket){
            socket.off('newMessage')
         }
       } catch (error) {
        console.log(error)
       }

    },

    setSelectedUser:(user)=>{
        set({selectedUser:user})
    }
}))