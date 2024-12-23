'use client'

import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='fixed z-10 w-full flex bg-amber-500 h-12 justify-between px-8 items-center'>
      <div className='text-2xl font-extrabold text-amber-900'> <Link href='/'>Compact URL</Link> </div>
      <ul className='flex gap-3 items-center '>
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/compactURL'>Url Shortner</Link></li>
        <li><Link href='/about'>About Us</Link></li>
        <li><Link href='/contact'>Contact Us</Link></li>
        <button 
        className='bg-amber-800 px-2 py-1 shadow-black shadow-md text-white rounded-full font-bold active:scale-110 transition-all'
        > <Link href='/compactURL'>Try Now</Link></button>
        <button
        className='bg-amber-800 px-2 py-1 shadow-black shadow-md text-white rounded-full font-bold active:scale-110 transition-all'
        ><Link href='https://github.com/Amitchaudhary0/CompactURL'>GitHub</Link></button>
      </ul>
    </nav>
  )
}

export default Navbar
