// in viewPaste PAge we want the same layout as home page or Home.jsx to view it
//so, we just copying the contents from Home.jsx to ViewPaste.jsx 
//copy code includes all the html code and import codes and buttons from pastes.jsx

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from "react-router-dom";
import { addtopastes, removefrompastes, updatetopastes } from '../redux/pasteSlices';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';

const ViewPaste = () => {

  const { id } = useParams();

  // apne saare pastes ko nikal lenge using useSelector from our state phir jo { id } tumhare pass aa rhi hai useParams ko use krke 
  // uss id ke basis pe tumne iss paste ke andar se uss id matching ke corresponding ek paste nikal liya 
  const allPastes = useSelector((state) =>
    state.paste.pastes);

  //paste jo tumne uss id useparam ke corresponding nikali hai
  const paste = allPastes.filter((p) => p._id === id)[0]; // [0] bcuz data is return in the form of array and we want to retrieve the value
  // that is on [0]th index
  console.log("inal Paste:", paste);

  // iss paste ko tumne value={paste.Title}, value={paste.content} , yaha utilise kr liya


  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">

        <input
          className="p-1 rounded-2xl mt-2 w-[66%] pl-4"
          type='text'
          placeholder='Enter the Title'
          value={paste.Title}
          // disabled //to not write anything over here
          onChange={(e) => setTitle(e.target.value)}
        />


      </div>

      <div className="mt-8 ">
        {/* textarea to write the content  */}
        <textarea
          className="rounded 2xl mt-4 min-w-[500px] p-4"
          value={paste.content} // value={Value} give the error Value is not defined
          placeholder='Enter the content here'
          // disabled //to not write anything over here
          onChange={(e) => setValue(e.target.value)}
          rows={20}

        />

        <div>


          <button onClick={() => {
            navigator.clipboard.writeText(paste?.content)
              /
              toast.success("Text copied to clipboard")
          }}>
            <Copy/>
          </button>

        </div>
      </div>
    </div>

  )
}

export default ViewPaste
