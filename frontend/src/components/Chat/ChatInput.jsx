import React from 'react';

const ChatInput = () => {
  return (
    <div className="p-4 bg-white border-t border-gray-200 flex items-center">
      <input type="text" className="flex-1 bg-gray-100 rounded-full px-4 py-2" placeholder="Type a message..." />
      <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full">Send</button>
    </div>
  );
};

export default ChatInput;
