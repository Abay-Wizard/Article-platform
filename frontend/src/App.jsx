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
import Profile from './pages/Profile'
import { userStore } from './store/userStore'
import { useEffect } from 'react'

function App() {
  const { checkUser} = userStore()
  useEffect(() => {
    checkUser();
  }, []);
  
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/connect' element={<Connect />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
