import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getInitials } from '../../utils';
import { useFetchChatsQuery } from '../../redux/slices/api/chatApiSlice';

const ChatMessages = () => {
    const { user } = useSelector((state) => state.auth);
    const {data} = useFetchChatsQuery();
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="flex items-start mb-4">
      {/* <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700 mr-2'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.data.name)}
            </span>
        </div> */}
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm">Hello, this is a message!</p>
        </div>
      </div>
      <div className="flex items-start mb-4 flex-row-reverse">
        {/* <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700 ml-2'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.data.name)}
            </span>
        </div> */}
        <div className="bg-blue-500 text-white p-3 rounded-lg shadow-sm">
          <p className="text-sm">Hi! This is a reply.</p>
        </div>
      </div>
      {/* Repeat for more messages */}
    </div>
  );
};

export default ChatMessages;
