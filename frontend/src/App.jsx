import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddBlog from './pages/AddBlog';
import ViewBlog from './pages/ViewBlog';
import EditBlog from './pages/EditBlog';
import SearchBlog from './pages/SearchBlog';

const App = () => {
  return (
    <>
    <Toaster />
    <main className=''>
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/verifyemail' element={<VerifyEmail/>}/>
      <Route path='/forgot' element={<ForgotPassword/>}/>
      <Route path='/changepassword' element={<ChangePassword/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/me' element={<Profile/>}/>
      <Route path='/add-blog' element={<AddBlog/>}/>
      <Route path='/blog/:blogId' element={<ViewBlog/>}/>
      <Route path='/edit' element={<EditBlog/>}/>
      <Route path='/search' element={<SearchBlog/>}/>


      </Routes>
    </main>
    </>
  )
}

export default App