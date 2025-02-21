import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { addtopastes, updatetopastes } from '../redux/pasteSlices';

const Home = () => {

  // jitni bhi useSate mein set wale function hai un sab pe onChange event listener lagega to change and then set function contain the updated value
  const [Title, setTitle] = useState('');
  const [Value, setValue] = useState('');

  //paste id ek parameter ki form mein aa sakti hai
  // uske liye ek hook hoti hai hmare pass SearchParams krke uska use krke hum nikal sakte hai
  const [searchParams, setSearchParams] = useSearchParams(); // Destructure useSearchParams
  // now, mujhe query parameter chahiye jiski key ki value pasteid ho
  const pasteId = searchParams.get("pasteId"); // Get pasteId from the search params
 
  // ek baar saare paste nikal lenge that is use in useEffect Dependency [pasteId]
  const allPastes = useSelector((state) => state.paste.pastes);

  // apne reducer function ko access krne ke liye hme dispatcher ki need padegi to dispatch it
  const dispatch = useDispatch();

  
    // to add the content in home page while using edit btn
    useEffect(() => {
      if(pasteId){ //if pasteId is valid
        const paste = allPastes.find((p) => 
        p._id === pasteId);
        // invoke title and content to home page to edit the the title and content from myPastes
        setTitle(paste.Title);
        setValue(paste.content);

      } 
    }, [pasteId])


  // creating logic of after click on create my paste btn
  function createPaste() {
    // responsibility of this fn is to create the paste then send it to slice
    const paste = {
      Title: Title,
      content: Value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    
    
    // concept to store the created paste in local storage
    if(pasteId){
      // update it, isme pasteid pehle se hi bani hai means paste create ho chuka hai
      dispatch(updatetopastes(paste)); //sending paste in payload
    }
    else{
      // create it, isme pasteid pehle se nhi bani hai means paste create krna hai
      dispatch(addtopastes(paste));
    }

    // after creation or updation
    // we want to clear workspace
    setTitle('');
    setValue('');
    setSearchParams({});

  }


  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
    <div className="flex flex-col gap-y-5 items-start">
      <div className="w-full flex flex-row gap-x-4 justify-between items-center">

        <input
          className="p-1 rounded-2xl mt-2 w-[66%] pl-4"
          type='text'
          placeholder='Enter the Title'
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
         
        />

        <button
         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={createPaste}
          >
          {
            pasteId ? "Update My Paste" : "Create My Paste"
            // agar pasteId mil gyi toh Update my paste ka btn show kr do nahi mili toh Create My Paste ka btn show kr do
          }

        </button>
      </div>
      <div className="mt-8 ">
        {/* textarea to write the content  */}
        <textarea
          className="rounded 2xl mt-4 min-w-[500px] p-4"
          value={Value} //value is defined useSate hook, copy from here
          placeholder='Enter the content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}

        />
      </div>
    </div>
   </div>


  )
}

export default Home
