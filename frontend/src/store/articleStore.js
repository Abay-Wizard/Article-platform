import {create} from 'zustand'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'
export const articleStore=create((set,get)=>({
    articles:[],
    userArticles:[],
    isPostingArticle:false,
    isFetchingArticles:false,
    isUpdatingArticle:false,
    isDeletingArticle:false,
    postArticle:async(data)=>{
        set({isPostingArticle:true})
        try {
            const res=await axiosInstance.post('/article/post',data)
            if(res.data.success){
              toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
            toast.error(error?.response?.data?.message)
        } finally{
            set({isPostingArticle:false})
        }
    },
    fetchArticles:async()=>{
          set({isFetchingArticles:true})
        try {
            const res=await axiosInstance.get('/article/all-articles')
            if(res.data.success){
                set({articles:res.data.data})
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
        }finally{
            set({isFetchingArticles:false})
        }
    },
    getUserArticles:async()=>{
        try {
           const res=await axiosInstance.get('/article/user-articles')
           if(res.data.success){
            set({userArticles:res.data.data})
           }
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    },
    deleteArticle:async(id)=>{
        set({isDeletingArticle:true})
        try {
            const res=await axiosInstance.delete(`/article/delete/${id}`)
            if(res.data.success){
                //for instant UI update
                set({
                    articles:get().articles.filter(article=>article._id!==id),
                    userArticles:get().userArticles.filter(userArticle=>userArticle._id !==id)
                })
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
            toast.error(error?.response?.data?.message)
        }finally{
            set({isDeletingArticle:false})
        }
    },
    getSingleArticle:async(id)=>{
       try {
        const res=await axiosInstance.get(`/article/single-article/${id}`)
          if(res.data.success){
            const article=res.data.data
            return article
          }else{
            return
          }
       } catch (error) {
        console.log(error?.response?.data?.message)
       }
    },
    updateArticle:async(id,data)=>{
        set({isUpdatingArticle:true})
        try {
            const res=await axiosInstance.put(`/article/update/${id}`,data)
            if(res.data.success){
                //for instant UI update
               const updatedArticle=res.data.data
                set({
                   articles:get().articles.map(article=>article._id===id ? updatedArticle:article),
                   userArticles:get().userArticles.map(userArticle=>userArticle._id ===id ? updatedArticle:userArticle)
                })
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
            toast.error(error?.response?.data?.message)
        }finally{
            set({isUpdatingArticle:false})
        }
    }
}))