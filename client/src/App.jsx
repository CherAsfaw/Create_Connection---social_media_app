import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Messages from './pages/Messages'
import ChatBox from './pages/ChatBox'
import Connections from './pages/Connections'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
const App = () => {
  return (
    <>
      <Routes>
        {/* We Define our routes here */}
        <Route path="/" element={<Login/>}>
          <Route index element={<Feed />}/>
          <Route path='message' element={<Messages/>}/>
          <Route path='message/:userId' element={<ChatBox />}/>
          <Route path='connection' element={<Connections />}/>
          <Route path='discover' element={<Discover />}/>
          <Route path='profile' element={<Profile />}/>
          <Route path='profile/:profileId' element={<Profile />}/>
          <Route path='create-post' element={<CreatePost />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App