import React from 'react';
import { getInitials } from '../../utils';
import { useSelector } from 'react-redux';

const ChatHeader = () => {
    const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center">
        <div className='w-7 h-7 rounded-full text-white flex items-center justify-center text-sm bg-blue-700 mr-2'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.data.name)}
            </span>
        </div>
        <h2 className="text-lg font-semibold">Chat Title</h2>
      </div>
      <button className="text-gray-600 hover:text-gray-800"></button>
    </div>
  );
};

export default ChatHeader;
