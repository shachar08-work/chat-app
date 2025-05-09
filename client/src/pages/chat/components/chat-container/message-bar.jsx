import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from "react-icons/gr"
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';

const MessageBar = () => {

    const [message, setMessage] = useState("");
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const emojiRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmojiPickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); }
    }, [emojiRef])

    const handleAddEmoji = async (event) => {
        setMessage((msg) => msg + event.emoji);
    }

    const handleSendMessage = async (event) => {
        event.preventDefault();

        await addDoc(collection(doc(db, 'rooms', roomId), 'messages'), {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp()
        });
        setInput('');
    };

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6'>
        <div className='flex flex-1 bg-[#2a2b33] rounded-md items-center gap-5 pr-5'>
            <input placeholder='Type a message' type='text' value={message} onChange={e => setMessage(e.target.value)} className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none' />
            <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
                <GrAttachment className='text-2xl' />
            </button>
            <div className='relative'>
                <button onClick={() => setEmojiPickerOpen(true)} className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
                    <RiEmojiStickerLine className='text-2xl' />
                </button>
                <div ref={emojiRef} className='absolute bottom-16 right-0'>
                    <EmojiPicker theme='dark' open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
                </div>
            </div>
        </div>
        <button type='submit' onClick={handleSendMessage} className='bg-[#8417ff] hover:bg-[#541bda] focus:bg-[#541bda] rounded-md flex items-center justify-center p-5 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
            <IoSend className='text-2xl' />
        </button>
    </div>
  )
}

export default MessageBar;