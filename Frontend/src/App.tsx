import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import { Router, Route, Routes } from 'react-router-dom'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import SingleBlog from './Components/SingleBlog'
import PostBlog from './Components/PostBlog'
import MyBlogs from './Components/MyBlogs'
import ProtectedRoute from "./ProtectedRoute"
import { getUserDetails } from './ApiCall'
import { useDispatch } from 'react-redux'
import { storeUser } from './Features/UserSlice'
import { useEffect } from 'react'
import Chat from './Components/Chat'
import ChatWithUser from './Components/ChatWithUser'
import io from "socket.io-client"
function App() {
  const socket = io("http://localhost:8000",{
    withCredentials:true
  });
  // console.log("App is rendering");
  const dispatch = useDispatch()
  useEffect(() => {
        
      const callApi = async()=>{
        const userDet = await getUserDetails()
        if(userDet){
            // user2 = userDet
            dispatch(storeUser(userDet));
        }
      }
      callApi()
    },[])
  return (
    <div className='w-[1400px] m-auto '>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/blog/:id' element={
          <ProtectedRoute>
            <SingleBlog />
          </ProtectedRoute>
        } />
        <Route path='/postBlog' element={
          <ProtectedRoute>
            <PostBlog/>
          </ProtectedRoute>
        } />

        <Route path='/MyBlogs' element={
          <ProtectedRoute>
            <MyBlogs/>
          </ProtectedRoute>
        } />

        <Route path='/chat' element={
          <ProtectedRoute>
            <Chat/>
          </ProtectedRoute>
        } />

        <Route path='/chatWith/:id' element={
          <ProtectedRoute>
            <ChatWithUser/>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
