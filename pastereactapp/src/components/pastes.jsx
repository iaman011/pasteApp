import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removefrompastes } from '../redux/pasteSlices.js';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";




function pastes() {
  const pastes = useSelector((state) => state.paste.pastes); //state.name.value in pasteSlice.js



  //  console.log(pastes)  to view/log the data in your console
  //used for search in filtering
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  // filteredData is used in search bar as we search we basically do filtering to match the required output
  const filteredData = pastes.filter(
    (pastes) => pastes.Title.toLowerCase().includes(searchTerm.toLowerCase())
    // ..converted the data in lower case to have same value 
  );

  //sendind pasteId is mandatory step to delete
  function handleDelete(pasteId) {
    dispatch(removefrompastes(pasteId));
  }


  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-black mt-6">
          <input /*creating search bar */
            className='p-2 rounded-2xl min-w-[600px] mt-5'
            type='search'
            placeholder='Search here'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        {/* All Pastes */}
        <div className="flex flex-col border border-black py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-black pb-4">
            All Pastes
          </h2>
          {/* creating cards for our filtered data */}
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {//for visibility of data created in pastes
              filteredData.length > 0 && filteredData.map((paste) => {

                return (
                  <div className="border border-black w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"

                    key={paste?._id}>
                    {/* having key={paste?._id} says if it is unique key, use case in copy btn */}

                    {/* heading and Description */}
                    <div className="w-[50%] flex flex-col space-y-3">
                      <p className="text-2xl font-semibold truncate">
                         {paste.Title}
                         </p>
                      <p className="text-sm font-normal line-clamp-3 max-w-[100%] text-white-900">
                      {paste.content}</p>
                    </div>

                     {/* icons */}

                     <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                      >
                        {/* redirect to home page and change the UI/functionality of the btn from create my paste to update mt paste */}
                        <Link to={`/?pasteId=${paste?._id}`}>
                          <PencilLine 
                          className="text-black group-hover:text-blue-500"
                          size={20}
                          />
                        </Link>

                      </button>

                      
                      <button 
                         className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                      onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2 
                          className="text-black group-hover:text-red-500"
                          size={20}
                        />
                      </button>

                      <button
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500"
                      >
                        {/* <a href={`/pastes/${paste?._id}`}></a> */}
                        {/* we redirect on out ViewPaste Page */}
                        <Link to={`/pastes/${paste?._id}`}>
                          <Eye 
                           className="text-black group-hover:text-yellow-500"
                           size={20}
                          />
                        </Link>
                      </button>


                      <button 
                       className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content)
                        // navigator.clipboard.writeText(paste?.Title)
                        toast.success("Text copied to clipboard")
                      }}>
                        <Copy 
                        className="text-black group-hover:text-green-500"
                        size={20}
                        />
                      </button>

                      {/* <button onClick={() => {
                    <a href={`/?pasteId=${paste?._id}`}></a>
                    toast.success("Sharing")
                  }}>
                    Share
                  </button> */}

                    </div>
                   </div>
                    {/* <div> */}
                    {/* {paste.createdAt} */}
                    {/* to display the date */}
                    {/* </div> */}

                    <div className="gap-x-2 flex ">
                      <Calendar className="text-black" size={20} />
                      {paste.createdAt}
                      {/* {formatDate(paste.createdAt)} */}
                    </div>
                  </div>
                );

              }


              )}
          </div>

        </div>
      </div>
    </div>



  );
}

export default pastes
