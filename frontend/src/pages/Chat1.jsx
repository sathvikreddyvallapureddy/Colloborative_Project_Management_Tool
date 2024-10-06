import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Chat = () => {
  const {user}  = useSelector((state) => state.auth);
  return (
    <div class="bg-gray-100 h-screen flex">

  {/* <!-- Sidebar --> */}
  <div class="w-1/4 bg-white border-r border-gray-200 flex flex-col">
    <div class="p-4 border-b border-gray-200">
      <h1 class="text-xl font-bold">Chat App</h1>
    </div>
    <div class="flex-1 overflow-y-auto">
      {/* <!-- List of chats/contacts --> */}
      <div class="p-4 hover:bg-gray-100 cursor-pointer">
        <h2 class="text-lg font-semibold">Chat 1</h2>
        <p class="text-sm text-gray-600">Last message...</p>
      </div>
      <div class="p-4 hover:bg-gray-100 cursor-pointer">
        <h2 class="text-lg font-semibold">Chat 2</h2>
        <p class="text-sm text-gray-600">Last message...</p>
      </div>
      {/* <!-- Repeat for more chats --> */}
    </div>
  </div>

  {/* <!-- Chat Window --> */}
  <div class="w-3/4 flex flex-col">
    {/* <!-- Header --> */}
    <div class="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
      <div class="flex items-center">
        {/* <img src="https://via.placeholder.com/40" alt="Profile Picture" class="rounded-full w-10 h-10 mr-4"> */}
        <h2 class="text-lg font-semibold">Chat Title</h2>
      </div>
      <button class="text-gray-600 hover:text-gray-800">Settings</button>
    </div>
    
    {/* <!-- Messages --> */}
    <div class="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div class="flex items-start mb-4">
        {/* <img src="https://via.placeholder.com/40" alt="Profile Picture" class="rounded-full w-10 h-10 mr-4"> */}
        <div class="bg-white p-3 rounded-lg shadow-sm">
          <p class="text-sm">Hello, this is a message!</p>
        </div>
      </div>
      <div class="flex items-start mb-4 flex-row-reverse">
        {/* <img src="https://via.placeholder.com/40" alt="Profile Picture" class="rounded-full w-10 h-10 ml-4"> */}
        <div class="bg-blue-500 text-white p-3 rounded-lg shadow-sm">
          <p class="text-sm">Hi! This is a reply.</p>
        </div>
      </div>
      {/* <!-- Repeat for more messages --> */}
    </div>

    {/* <!-- Message Input --> */}
    <div class="p-4 bg-white border-t border-gray-200 flex items-center">
      {/* <input type="text" class="flex-1 bg-gray-100 rounded-full px-4 py-2" placeholder="Type a message..."> */}
      <button class="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full">Send</button>
    </div>
  </div>

    </div>
  )
}

export default Chat