import React from 'react'
import MessageBar from './message-bar'
import MessageContainer from './message-container'
import ChatHeader from './chat-header'

const ChatContainer = () => {
  return (
    <div className='static top-0 h-[100vh] w-[100vw] border-r-2 border-[#af303b] bg-[#1c1d25] flex flex-col flex-1'>
        <ChatHeader />
        <MessageContainer />
        <MessageBar />
    </div>
  )
}

export default ChatContainer