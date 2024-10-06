import React from 'react';
// import SideBar from '../components/Chat/SideBar';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatMessages from '../components/Chat/ChatMessages';
import ChatInput from '../components/Chat/ChatInput';
import SideBar from '../components/Chat/SideBar';

const App = () => {
  return (
    <div className="bg-gray-100 h-screen flex">
      <SideBar />
      <div className="w-3/4 flex flex-col">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  );
};

export default App;
