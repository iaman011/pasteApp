// use the docs for code : https://redux-toolkit.js.org/tutorials/quick-start

import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';

const initialState = {
    // pastes is a value over here if it is true it fetch the data from local storage to our console
    //right now our data is stored in local storage
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : [],
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {

      // addtopastes,updatetopastes, resetallpastes, removefrompastes are all called reducer function which is written in slice

    addtopastes: (state,action) => {
      //isme hmare pass pura payload aa rha hoga
      // as we payload paste in addtopaste in home.jsx
      const paste=action.payload;  //extract the paste, //aapne paste ko nikala apne payload se
      state.pastes.push(paste);  //extract krke yaha push kr do, basically ab hmara paste centralised store mein aa chuka hai
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); // now our paste is in local storage in "key", value pair (key="pastes",value=JSON.stringify(state.pastes))
      toast.success("Pastes created successfully")  //toast.success krne se wo green check mein notify krega 
     
    },
    updatetopastes: (state,action) => {
      //again, isme bhi hmare pass pura payload aa rha hoga jo paste mujhe update krna hai wo pehle se mere state mein kaha exist krta hai uska index nikal ke le ayenge 

      const paste = action.payload; //aapne paste ko nikala apne payload se
      const index = state.pastes.findIndex((item) =>
      item._id === paste._id //if they exist
      );

      if (index >= 0){  //if index is valid means not -ve 
        state.pastes[index] = paste; //toh aapne iss paste ko update kra diya index ke andar

        localStorage.setItem("pastes", JSON.stringify(state.pastes)); //isi paste ko update kra diya local storage ke andar

        toast.success("Pastes Updated");  //aapne toast ko display kra diya
      }
    },
    resetallpastes: (state, action) => {
      // const paste = action.payload; //aapne paste ko nikala apne payload se
      state.pastes = []; //mujhe kuch nhi chahiye state ke andar to main ne state ko empty array ke equal kra diya

      localStorage.removeItem("pastes"); //local storage ko bhi pura empty kr diya pastes wali key ko remove krke
      
    },
    removefrompastes: (state, action) => {
      const pasteId = action.payload; //aapne paste ko nikala apne payload se

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => //aapne check kiya aapke iss wale paste ka index kya hai aapke state.pastes wale array ke andar
      item._id === pasteId); //if they exist

      if (index >=0) {
        state.pastes.splice(index, 1); //aapne specificaly iss wale paste ko apne state se delete kra diya aur nayi wali state jo aapki bn rhi hai usko ,

        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // local storage ke andar update kr diya 

        toast.success("Pastes Deleted"); //display the toast
      }
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { addtopastes,updatetopastes,resetallpastes,removefrompastes } = pasteSlice.actions

export default pasteSlice.reducer