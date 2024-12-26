'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  
  const [toggle, setToggle] = useState(false);
  
  return (
    <nav className='fixed z-50 w-full flex bg-amber-500 h-12 justify-between items-center'>
      <div className='z-10 bg-amber-500 h-12 w-[80%] content-center pl-8'>
      <div className='text-2xl font-extrabold text-amber-900'> <Link href='/'>Compact URL</Link> </div>
      </div>
<button className='sm:hidden flex z-10  bg-amber-500 h-12 w-[20%] justify-end pr-2 items-center ' onClick={()=>setToggle(!toggle)}><CiMenuFries /></button>

      <div className=' sm:w-full w-auto'>
      <ul className={`z-0 flex sm:justify-end gap-3 sm:pr-8 items-center flex-col absolute justify-evenly right-0 transition-all duration-1000 ease-in-out h-[34vh] rounded-b-md bg-amber-400 w-full sm:w-[580px]
      sm:flex-row sm:static sm:h-12 sm:z-10 sm:transition-none sm:bg-amber-500 ${toggle?"top-12":"top-[-20rem]" }  `}>
        <li className='w-full sm:w-auto text-center '><Link onClick={()=>setToggle(false)} className='w-full sm:w-auto sm:focus:bg-amber-500 hover:text-white focus:bg-amber-200 p-1 block transition-all duration-200' href='/'>Home</Link></li>
        <li className='w-full sm:w-auto text-center '><Link onClick={()=>setToggle(false)} className='w-full sm:w-auto sm:focus:bg-amber-500 hover:text-white focus:bg-amber-200 p-1 block transition-all duration-200' href='/compactURL'>Url Shortner</Link></li>
        <li className='w-full sm:w-auto text-center'><Link onClick={()=>setToggle(false)} className='w-full sm:w-auto sm:focus:bg-amber-500 hover:text-white focus:bg-amber-200 p-1 block transition-all duration-200' href='/about'>About Us</Link></li>
        <li className='w-full sm:w-auto text-center'><Link onClick={()=>setToggle(false)} className='w-full sm:w-auto sm:focus:bg-amber-500 hover:text-white focus:bg-amber-200 p-1 block transition-all duration-200' href='/contact'>Contact Us</Link></li>
        <li className='w-full block md:hidden sm:w-auto text-center'><Link onClick={()=>setToggle(false)} className='w-full sm:w-auto sm:focus:bg-amber-500 hover:text-white focus:bg-amber-200 p-1 block md:hidden transition-all duration-200' href='https://github.com/Amitchaudhary0/CompactURL'>GitHub</Link></li>
        <button 
        className='bg-amber-800 hidden md:block px-2 py-1 shadow-black shadow-md text-white rounded-full font-bold active:scale-110 transition-all'
        > <Link href='/compactURL'>Try Now</Link></button>
        <button
        className='bg-amber-800 px-2 py-1 hidden md:block shadow-black shadow-md text-white rounded-full font-bold active:scale-110 transition-all'
        ><Link href='https://github.com/Amitchaudhary0/CompactURL'>GitHub</Link></button>
      </ul>
        </div>
    </nav>
  )
}

export default Navbar
