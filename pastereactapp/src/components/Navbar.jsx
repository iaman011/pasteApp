import React from 'react'
import { NavLink } from 'react-router-dom'
// We showing create, Update and View UI under Navbar

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 place-content-evenly'>
      <NavLink
      to={"/"}
      >
        Home
      </NavLink>

      <NavLink
      to={"/pastes"}
      >
        MyPastes
      </NavLink>
  
    </div>
  )
}

export default Navbar
