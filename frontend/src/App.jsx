import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Connect from './pages/Connect'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import LeftSide from './components/LeftSide'
import Profile from './pages/Profile'
import PostArticle from './pages/PostArticle'
import Articles from './pages/Articles'
import UserArticles from './pages/UserArticles'
import { userStore } from './store/userStore'
import { useEffect } from 'react'
import UpdateArticle from './pages/UpdateArticle'
import Chat from './pages/Chat'

function App() {
  const { checkUser, user, isCheckingUser } = userStore()
  useEffect(() => {
    checkUser();
  }, []);
  if (isCheckingUser && !user) {
    return <h1 className='text-center text-3xl text-purple-500 mt-8'>Loading ...</h1>
  }
  return (
    <div className='flex px-12 flex-col min-h-screen'>
      <Navbar />
      <div className='flex w-full gap-x-5'>
        <LeftSide />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/connect' element={<Connect />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/post' element={<PostArticle />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/user-articles' element={<UserArticles />} />
            <Route path='/update-article/:id' element={<UpdateArticle />} />
            <Route path='/chat/:id' element={<Chat />} />
          </Routes>
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
