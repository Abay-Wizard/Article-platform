import React from 'react'
import { messageStore } from '../store/messageStore'
import { X } from 'lucide-react'


const ChatHeader = () => {
  const {selectedUser,setSelectedUser} =messageStore()
  return (
    <div className='flex justify-between'>
      <div className='flex gap-1.5'>
        <img src={selectedUser.profilePic} alt='user'/>
        <div className='flex flex-col gap-1'>
            <p>{selectedUser.fullName}</p>
            <p>{selectedUser.profession}</p>
        </div>
        
      </div>
      <div onClick={()=>setSelectedUser(null)}>
        <X size={20}/>
      </div>
    </div>
  )
}

export default ChatHeader
