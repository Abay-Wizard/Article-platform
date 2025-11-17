import React from 'react'
import ChatSelected from '../components/ChatSelected'
import NoChatSelected from '../components/NoChatSelected'
import LeftSideChat from '../components/LeftSideChat'
import { messageStore } from '../store/messageStore'


const Chat = () => {
  const {selectedUser} =messageStore()
  return (
    <div className='flex justify-between'>
      <LeftSideChat/>
      {
        selectedUser? <ChatSelected/>:<NoChatSelected/>
      }
      
    </div>
  )
}

export default Chat
