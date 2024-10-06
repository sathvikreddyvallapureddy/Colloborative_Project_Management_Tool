import React, { useEffect, useState } from 'react';
import { getInitials } from '../../utils';
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSearch, MdPerson } from 'react-icons/md';
import { useGetTeamListQuery } from '../../redux/slices/api/userApiSlice';
import { useAccessChatsMutation, useFetchChatsQuery } from '../../redux/slices/api/chatApiSlice';
import { toast } from 'sonner';
import ChatMessages from './ChatMessages';

const SideBar = () => {
    const { user } = useSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChat, setSelectedChat] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
  
    const {data: filteredSearch} = useGetTeamListQuery({search:searchTerm || ''});
    const {data: chats} = useFetchChatsQuery();
    
    const handleInputChange = (event) => {
      const value = event.target.value;
      setSearchTerm(value);
    };
    const [accessChats] = useAccessChatsMutation();
    const accessChat = async(otherUserId) => {
      try {
        const chatdata = await accessChats({otherUserId}).unwrap();
        setSelectedChat(otherUserId)
      } catch (error) {
        toast.error(error?.data.message || error.error);
      }
    }

    

  return (
    // <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
      

    //   {/* SEARCH BAR */}
    //   <div className='m-2 flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
    //       <MdOutlineSearch className='text-gray-500 text-xl' />
    //       <input
    //         type='text'
    //         placeholder='Search....'
    //         value={searchTerm}
    //         onChange={handleInputChange}
    //         className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
    //       />
    //   </div>
    //   {searchTerm && 
    //   (
    //     <ul>
    //       {filteredSearch?.map(item => (
    //         <li key={item._id}>
    //           <div className="bg-sky-100 hover:bg-sky-200 shadow-md rounded p-4 cursor-pointer " onClick={()=>accessChat(item._id)}>
    //             <h4 className="text font-bold mb-2">{item.name}</h4>
    //             <h4 className="text font-bold mb-2">{item._id}</h4>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   )
    //   }
    //   <div className="flex-1 overflow-y-auto">
    //     {chats?.map(chat => (
    //       <div className="flex p-4 hover:bg-gray-100 cursor-pointer" key={chat?._id}>
    //       <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700 mr-2'>
    //           <span className='text-xs md:text-sm text-center'>
    //             <MdPerson/>
    //           </span>
    //       </div>
    //       <div>
    //         {chat?.users.map(user=>(
    //           <div key={user?._id}>
    //             {/* <h2 className="text-lg font-semibold">{u}</h2>
    //             <p className="text-sm text-gray-600"></p> */}
    //             {console.log(user)}
    //           </div>
    //       ))}
    //       <h2 onClick={()=>accessChat(chat._id)}>{chat.chatName}</h2>
    //       {/* {console.log(chat)} */}
    //       </div>
    //       </div>
    //     ))}
        
        
    //   </div>
    // </div>


    <div className="flex relative">
        <div className=" bg-white border-r border-gray-200 flex flex-col">
          {/* SEARCH BAR */}
          <div className='m-2 flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
            <MdOutlineSearch className='text-gray-500 text-xl' />
            <input
              type='text'
              placeholder='Search....'
              value={searchTerm}
              onChange={handleInputChange}
              className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
            />
          </div>
          {searchTerm && 
            (
              <ul className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-lg m-2  z-10 max-h-60 overflow-y-auto">
                {filteredSearch?.map(item => (
                  <li key={item._id} className='border-b last:border-0'>
                    <div className="bg-sky-100 hover:bg-sky-200 shadow-md rounded p-4 cursor-pointer" onClick={() => selectUser(item)}>
                      <h4 className="text font-bold mb-2">{item.name}</h4>
                    </div>
                  </li>
                ))}
              </ul>
            )
          }
          <div className="flex-1 overflow-y-auto">
            {chats?.map(chat => (
              <div className="flex p-4 hover:bg-gray-100 cursor-pointer" key={chat._id} onClick={() => setSelectedChat(chat)}>
                <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700 mr-2'>
                  <span className='text-xs md:text-sm text-center'>
                    <MdPerson/>
                  </span>
                </div>
                <div>
                  <h2>{chat.chatName}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
  );


};

export default SideBar;
